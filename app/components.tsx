import {Camera,LockKeyhole} from 'lucide-react';
import Navigation from './navigation';

export function Brand(){return <a className="brand" href="/" aria-label="LabITec POA, início"><img className="brand-logo" src="/labitec-logo.png" alt="LabITec POA" width={112} height={112}/><span className="brand-caption"><small>LABITEC POA</small><strong>O blog do laboratório</strong><span>Leite, ciência e qualidade</span></span></a>}

export function Header(){return <><a className="skip-link" href="#main-content">Pular para o conteúdo</a><header className="header"><div className="header-inner wrap"><Brand/><Navigation/></div></header><span id="main-content" className="content-anchor" tabIndex={-1}/></>}

export function Footer(){return <footer className="site-footer"><div className="footer-main wrap"><div className="footer-about"><Brand/><p>Conhecimento que conecta o campo,<br className="desktop"/> o laboratório e você.</p></div><div className="footer-links"><h2>Explore o blog</h2><nav aria-label="Navegação do rodapé"><a href="/">Início</a><a href="/#materias">Todas as matérias</a></nav></div><div className="footer-social"><h2>Acompanhe o laboratório</h2><a className="instagram-link" href="https://www.instagram.com/labitecpoa/" target="_blank" rel="noopener noreferrer"><span className="social-icon"><Camera size={22} aria-hidden="true"/></span><span><strong>@labitecpoa</strong><small>Instagram <span className="sr-only">(abre em nova aba)</span></small></span></a><a className="footer-admin" href="/admin"><LockKeyhole size={15} aria-hidden="true"/>Acesso da equipe</a></div></div><div className="footer-bottom"><div className="wrap footer-bottom-inner"><small>© 2026 LabITec POA. Todos os direitos reservados.</small><span>Ciência que vem do campo.</span></div></div></footer>}

