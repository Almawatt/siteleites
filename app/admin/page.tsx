import {Header,Footer} from '../components';
import {getLabUser} from '../lab-auth';
import Editor from './editor';import LoginForm from './login-form';import Logout from './logout';
export const dynamic='force-dynamic';
export default async function Admin(){
 try{const user=await getLabUser();return <><Header/>{user?<main className="admin wrap"><div className="admin-top"><div><div className="eyebrow">ÁREA DO LABORATÓRIO</div><h1>Suas matérias</h1><p>{user.email}</p></div><Logout/></div><Editor/></main>:<main className="login wrap"><div className="login-copy"><div className="eyebrow">ÁREA DO LABORATÓRIO</div><h1>Conhecimento<br/>para compartilhar.</h1><p>Acesso exclusivo de quem cuida das matérias do blog.</p></div><div className="login-card"><span className="eyebrow">ACESSO ADMINISTRATIVO</span><h2>Entrar no laboratório.</h2><p>Use o e-mail e a senha fornecidos à equipe responsável pelo site.</p><LoginForm/><a className="back" href="/">Voltar ao blog</a></div></main>}<Footer/></>}
 catch{return <><Header/><main className="wrap message"><h1>Acesso indisponível</h1><p>Não foi possível carregar o acesso do laboratório. Tente novamente em instantes.</p><a href="/admin">Tentar novamente</a></main><Footer/></>}
}