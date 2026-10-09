import {database} from '../../../db/posts';
import {ensureAdminAccount,sameOrigin,hashPassword,digest,equal,makeSession,sessionCookie,allowedAttempt,response,COOKIE} from '../../lab-auth';
import {cookies} from 'next/headers';
export async function POST(req:Request){
 if(!sameOrigin(req))return response({error:'Solicitação inválida.'},403);
 try{
  const b=await req.json() as Record<string,unknown>;
  if(b.action==='logout'){const token=(await cookies()).get(COOKIE)?.value;if(token)await database().prepare('DELETE FROM lab_sessions WHERE token_hash=?').bind(await digest(token)).run();return response({ok:true},200,sessionCookie(req,'',0))}
  if(b.action!=='login')return response({error:'Cadastro de contas não está disponível.'},403);
  if(typeof b.email!=='string'||typeof b.password!=='string')return response({error:'Informe e-mail e senha.'},400);
  const email=b.email.trim().toLowerCase(),password=b.password;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||password.length>128)return response({error:'Confira o e-mail e a senha.'},400);
  const attempt=await allowedAttempt(req,email);if(!attempt.ok)return response({error:'Muitas tentativas. Aguarde 15 minutos e tente novamente.'},429);
  await ensureAdminAccount();
  const row=await database().prepare('SELECT email,password_hash,salt FROM lab_accounts WHERE id=?').bind('laboratory').first<{email:string;password_hash:string;salt:string}>();
  const hash=await hashPassword(password,row?.salt||'dummy-salt-for-timing');
  if(!row||!equal(hash,row.password_hash)||email!==row.email)return response({error:'E-mail ou senha incorretos.'},401);
  await database().prepare('DELETE FROM lab_attempts WHERE key=?').bind(attempt.key).run();
  return response({ok:true},200,sessionCookie(req,await makeSession()));
 }catch(e){console.error('lab authentication failed',e);return response({error:'Não foi possível acessar agora. Tente novamente em instantes.'},503)}
}