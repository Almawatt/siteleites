'use client';
import {useState} from 'react';
export default function LoginForm(){
 const [error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();const f=new FormData(e.currentTarget);setBusy(true);setError('');
  try{const r=await fetch('/api/lab-auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'login',email:f.get('email'),password:f.get('password')})});const b=await r.json() as {error?:string};if(!r.ok)throw Error(b.error);window.location.assign('/admin')}
  catch(e){setError(e instanceof Error?e.message:'Não foi possível entrar.');setBusy(false)}
 }
 return <form onSubmit={submit} className="lab-login-form"><label>E-mail<input type="email" name="email" autoComplete="username" required maxLength={254} placeholder="Seu e-mail de acesso"/></label><label>Senha<input type="password" name="password" autoComplete="current-password" minLength={1} maxLength={128} required placeholder="Digite sua senha"/></label>{error&&<div role="alert" className="error">{error}</div>}<button disabled={busy} className="button">{busy?'Aguarde…':'Entrar no laboratório'}</button><small>Acesso exclusivo da equipe responsável pelas publicações.</small></form>
}