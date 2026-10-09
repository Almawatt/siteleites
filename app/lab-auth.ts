import {cookies} from 'next/headers';import {env} from 'cloudflare:workers';import {database} from '../db/posts';
export const COOKIE='lab_session';export const SESSION_SECONDS=28800;
const hex=(v:ArrayBuffer|Uint8Array)=>Array.from(new Uint8Array(v instanceof Uint8Array?v.buffer:v)).map(x=>x.toString(16).padStart(2,'0')).join('');
export const randomToken=()=>hex(crypto.getRandomValues(new Uint8Array(32)));
export async function digest(v:string){return hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v)))}
export async function hashPassword(password:string,salt:string){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:100000,hash:'SHA-256'},key,256))}
export function equal(a:string,b:string){if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0}
export async function getLabUser(){const token=(await cookies()).get(COOKIE)?.value;if(!token||!/^[a-f0-9]{64}$/.test(token))return null;return database().prepare('SELECT a.id,a.email FROM lab_sessions s JOIN lab_accounts a ON a.id=s.account_id WHERE s.token_hash=? AND s.expires_at>?').bind(await digest(token),new Date().toISOString()).first<{id:string;email:string}>()}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
export function sessionCookie(req:Request,token:string,maxAge=SESSION_SECONDS){return COOKIE+'='+token+'; Path=/; HttpOnly; SameSite=Strict; Max-Age='+maxAge+(new URL(req.url).protocol==='https:'?'; Secure':'')}
export async function makeSession(){const token=randomToken();const now=new Date().toISOString();await database().batch([database().prepare('DELETE FROM lab_sessions WHERE expires_at<=?').bind(now),database().prepare('INSERT INTO lab_sessions (token_hash,account_id,expires_at) VALUES (?,?,?)').bind(await digest(token),'laboratory',new Date(Date.now()+SESSION_SECONDS*1000).toISOString())]);return token}
export async function allowedAttempt(req:Request,email:string){const key=await digest(email+'|'+(req.headers.get('cf-connecting-ip')||'private'));const now=Date.now();const start=String(Math.floor(now/900000));await database().prepare('INSERT INTO lab_attempts (key,count,window_start) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN window_start=excluded.window_start THEN CAST(count AS INTEGER)+1 ELSE 1 END,window_start=excluded.window_start').bind(key,'1',start).run();const row=await database().prepare('SELECT count FROM lab_attempts WHERE key=?').bind(key).first<{count:string}>();return {ok:Number(row?.count)<=8,key}}
export function response(body:unknown,status=200,cookie?:string){return Response.json(body,{status,headers:{'Cache-Control':'no-store',...(cookie?{'Set-Cookie':cookie}:{})}})}

// Administrative provisioning only: runtime secrets, with no registration endpoint.
// INSERT OR IGNORE preserves an account that has already been configured.
export async function ensureAdminAccount(){
 const configured=env as unknown as {LAB_ADMIN_EMAIL?:string;LAB_ADMIN_PASSWORD_HASH?:string;LAB_ADMIN_PASSWORD_SALT?:string};
 const {LAB_ADMIN_EMAIL:email,LAB_ADMIN_PASSWORD_HASH:hash,LAB_ADMIN_PASSWORD_SALT:salt}=configured;
 if(!email||!hash||!salt)return;
 if(!/^[a-f0-9]{64}$/.test(hash)||!/^[a-f0-9]{64}$/.test(salt))throw new Error('Invalid administrative configuration');
 await database().prepare('INSERT OR IGNORE INTO lab_accounts (id,email,password_hash,salt,created_at) VALUES (?,?,?,?,?)').bind('laboratory',email.trim().toLowerCase(),hash,salt,new Date().toISOString()).run();
}
