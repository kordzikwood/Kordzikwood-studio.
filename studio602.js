/* KORDZIKWOOD 6.0.2 — one navigation, no repeated shortcuts. Legacy tools remain accessible. */
(()=>{'use strict';
const sections=[
 {id:'design',name:'Projektowanie',icon:'▤',main:[['full60','Projektant FULL PRO'],['editor','Konstruktor pojedynczej szafki']],more:[['space60','Starszy projektant przestrzeni'],['kitchen58','Narożniki i AGD'],['engineering','Szuflady i przesuwne'],['workflow57','Przegrody i okucia']]},
 {id:'materials',name:'Materiały',icon:'◈',main:[['worktops59','Blaty i Slimline'],['decors','Płyty i dekory']],more:[['settings','Ustawienia bibliotek']]},
 {id:'production',name:'Produkcja',icon:'⚙',main:[['parts','Formatki'],['production','Wycena i obrzeża']],more:[['engineering','Rozkrój i nawierty'],['kitchen58','Zestawienie kuchni']]},
 {id:'projects',name:'Projekty',icon:'▦',main:[['projects','Zapisane projekty'],['workflow57','Klienci i zlecenia']],more:[['settings','Kopie i ustawienia']]}
];
const top=document.querySelector('.kw59-top'),oldMenu=document.querySelector('.kw59-menu'),oldBottom=document.querySelector('.kw59-bottom');if(!top||!oldMenu||!window.KW59)return;
const shell=document.createElement('div');shell.className='kw602-shell';shell.innerHTML='<div class="kw602-heading"><strong id="kw602Title">Projektowanie</strong><span id="kw602Hint">Wybierz narzędzie</span></div><div class="kw602-primary" id="kw602Primary"></div><details class="kw602-more" id="kw602More"><summary>Więcej narzędzi specjalistycznych</summary><div id="kw602Extras"></div></details>';
oldMenu.insertAdjacentElement('afterend',shell);
const bottom=document.createElement('div');bottom.className='kw602-bottom';bottom.setAttribute('aria-label','Główne obszary aplikacji');document.body.append(bottom);
const primary=document.getElementById('kw602Primary'),extras=document.getElementById('kw602Extras'),heading=document.getElementById('kw602Title'),hint=document.getElementById('kw602Hint'),more=document.getElementById('kw602More');
let group='design',active='full60';
function navigate(id){active=id;window.KW59.openTab(id);document.querySelectorAll('.kw602-primary button,.kw602-more button').forEach(b=>{b.classList.toggle('kw602-selected',b.dataset.target===id);b.setAttribute('aria-current',b.dataset.target===id?'page':'false')});hint.textContent=[...sections.flatMap(x=>[...x.main,...x.more])].find(x=>x[0]===id)?.[1]||'Narzędzie';}
function makeBtn([id,name]){const b=document.createElement('button');b.type='button';b.textContent=name;b.dataset.target=id;b.addEventListener('click',()=>navigate(id));return b}
function showGroup(id,auto=true){const item=sections.find(x=>x.id===id);if(!item)return;group=id;heading.textContent=item.name;primary.replaceChildren(...item.main.map(makeBtn));extras.replaceChildren(...item.more.map(makeBtn));more.open=false;bottom.querySelectorAll('button').forEach(b=>{b.classList.toggle('kw602-active',b.dataset.group===id);b.setAttribute('aria-pressed',String(b.dataset.group===id))});if(auto)navigate(item.main[0][0]);}
sections.forEach(item=>{const b=document.createElement('button');b.type='button';b.dataset.group=item.id;b.innerHTML='<span aria-hidden="true">'+item.icon+'</span><small>'+item.name+'</small>';b.onclick=()=>showGroup(item.id);bottom.append(b)});
showGroup('design');
// Keep legacy search, favorites and quick actions working; sync their navigation into the new structure.
const observer=new MutationObserver(()=>{const tab=document.querySelector('main>.tab.active-tab');if(!tab||tab.id===active)return;const target=sections.find(x=>x.main.some(a=>a[0]===tab.id))||sections.find(x=>x.more.some(a=>a[0]===tab.id));if(target&&target.id!==group)showGroup(target.id,false);active=tab.id;document.querySelectorAll('.kw602-primary button,.kw602-more button').forEach(b=>b.classList.toggle('kw602-selected',b.dataset.target===active));});
const main=document.querySelector('body>main');if(main)observer.observe(main,{subtree:false,attributes:false,childList:true});
// A single click source for legacy tab changes, without altering their calculations.
document.querySelector('body>nav')?.addEventListener('click',e=>{const id=e.target.closest('[data-tab]')?.dataset.tab;if(!id)return;const target=sections.find(x=>x.main.some(a=>a[0]===id))||sections.find(x=>x.more.some(a=>a[0]===id));if(target&&target.id!==group)showGroup(target.id,false);active=id;document.querySelectorAll('.kw602-primary button,.kw602-more button').forEach(b=>b.classList.toggle('kw602-selected',b.dataset.target===id));});
window.KW602={showGroup,navigate};
})();