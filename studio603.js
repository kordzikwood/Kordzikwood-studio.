/* 6.0.3 Modern UI — single, accessible workspace navigation. Existing project data untouched. */
(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const icons={projects:'<path d="M3 7V5a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',design:'<path d="M3 3h18v18H3zM3 9h18M9 9v12"/>',materials:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',production:'<path d="M3 21V9l6 4V9l6 4V5h6v16zM7 17h2m3 0h2m3 0h2"/>'};
const svg=k=>`<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[k]||icons.design}</svg>`;
const bar=$('.kw602-bottom');if(!bar)return;
bar.querySelectorAll('button[data-group]').forEach(b=>{const k=b.dataset.group;const t=b.querySelector('span');if(t)t.innerHTML=svg(k);});
const top=$('.kw59-top');if(top){top.querySelector('.kw59-title')?.remove();const label=document.createElement('strong');label.className='kw603-brand';label.textContent='KORDZIKWOOD Studio';top.prepend(label);const s=top.querySelector('#kw59SearchBtn');if(s)s.textContent='⌕ Szukaj funkcji';}
const head=$('.kw602-heading');if(head){const crumb=document.createElement('span');crumb.className='kw603-crumb';crumb.textContent='Wybierz obszar i narzędzie';head.append(crumb);}
// Short, task-oriented labels instead of historical version numbers.
const renames={full60:'Projektant',editor:'Konstruktor mebla',space60:'Plan pomieszczenia',kitchen58:'Narożniki i AGD',engineering:'Szuflady i rozkrój',workflow57:'Okucia i zlecenia',worktops59:'Blaty i tekstury',decors:'Płyty i fronty',parts:'Lista formatek',production:'Wycena i obrzeża',projects:'Moje projekty',settings:'Ustawienia'};
function rename(){ $$('.kw602-primary button[data-target],.kw602-more button[data-target]').forEach(b=>{const id=b.dataset.target;if(renames[id]&&b.textContent!==renames[id])b.textContent=renames[id]});}
rename();new MutationObserver(rename).observe($('.kw602-shell'),{childList:true,subtree:true});
const section=$('#full60');if(!section)return;
const layout=section.querySelector('.fp-layout'),panels=section.querySelector('.fp-panels');if(!layout||!panels)return;
const detail=$$(' #full60 .fp-panels > details');
const steps=[['Pomieszczenie','room'],['Dodaj mebel','add'],['Edytuj mebel','edit'],['Materiały','materials'],['Produkcja','production']];
const switcher=document.createElement('div');switcher.className='kw603-steps';switcher.setAttribute('role','group');switcher.setAttribute('aria-label','Etapy pracy nad projektem');
steps.forEach(([name,id],i)=>{const b=document.createElement('button');b.type='button';b.dataset.step=id;b.textContent=name;b.setAttribute('aria-pressed','false');b.onclick=()=>openStep(i,true);switcher.append(b)});
panels.prepend(switcher);
const key='kw603_active_step';let current=0;
try{current=Math.max(0,Math.min(4,Number(sessionStorage.getItem(key))||0))}catch{}
function openStep(i,scroll){if(!detail[i])return;current=i;detail.forEach((d,j)=>{d.open=i===j;d.classList.toggle('kw603-current',i===j)});switcher.querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('kw603-active',i===j);b.setAttribute('aria-pressed',String(i===j))});try{sessionStorage.setItem(key,String(i))}catch{}if(scroll&&matchMedia('(max-width:850px)').matches)panels.scrollIntoView({behavior:'smooth',block:'start'});}
// Native details remain accessible. Opening a section closes the others.
detail.forEach((d,i)=>d.addEventListener('toggle',()=>{if(d.open&&current!==i)openStep(i,false)}));
openStep(current,false);
const add=$('#fpAdd');if(add)add.addEventListener('click',()=>openStep(1,true));
const select=$('#fpSvg');if(select){select.addEventListener('pointerup',e=>{const t=e.target;if(t?.closest?.('[data-id],[data-index],[data-item]'))openStep(2,false)});}
const exportBtn=$('#fpCSV');if(exportBtn)exportBtn.title='Eksport orientacyjnych formatek CSV — sprawdź przed produkcją';
// Make project editing the default and keep legacy tools available only through explicit menu.
const fullHead=section.querySelector('.fp-head h2');if(fullHead)fullHead.textContent='Projektant mebli';
const navTitle=$('.kw602-heading strong');if(navTitle)navTitle.textContent='Projektowanie';
window.KW603={openStep};
})();