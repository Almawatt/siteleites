'use client';

import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {LockKeyhole,Menu,X} from 'lucide-react';

export default function Navigation(){
 const pathname=usePathname();
 const [open,setOpen]=useState(false);
 const container=useRef<HTMLDivElement>(null);
 const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  if(!open)return;
  function escape(e:KeyboardEvent){if(e.key==='Escape'){setOpen(false);toggle.current?.focus()}}
  function outside(e:PointerEvent){if(container.current&&!container.current.contains(e.target as Node))setOpen(false)}
  document.addEventListener('keydown',escape);document.addEventListener('pointerdown',outside);
  return()=>{document.removeEventListener('keydown',escape);document.removeEventListener('pointerdown',outside)};
 },[open]);
 return <div className="navigation" ref={container}>
  <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Fechar menu':'Abrir menu'} onClick={()=>setOpen(!open)}>{open?<X size={22} aria-hidden="true"/>:<Menu size={22} aria-hidden="true"/>}<span>Menu</span></button>
  <nav id="main-navigation" className={'main-navigation'+(open?' is-open':'')} aria-label="Navegação principal">
   <a className={'nav-item'+(pathname==='/'?' current':'')} href="/" aria-current={pathname==='/'?'page':undefined} onClick={()=>setOpen(false)}>Início</a>
   <a className={'nav-item'+(pathname?.startsWith('/materias/')?' current':'')} href="/#materias" aria-current={pathname?.startsWith('/materias/')?'page':undefined} onClick={()=>setOpen(false)}>Matérias</a>
   <a className={'nav-admin'+(pathname?.startsWith('/admin')?' current':'')} href="/admin" aria-current={pathname?.startsWith('/admin')?'page':undefined} onClick={()=>setOpen(false)}><LockKeyhole size={16} aria-hidden="true"/><span>Área do laboratório</span></a>
  </nav>
 </div>;
}
