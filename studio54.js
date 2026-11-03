/* KORDZIKWOOD 5.4 — production helper. Offline, no external libraries. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const ids=['costBoard','costEdge','costHardware','costLabor','costInstall','costMarkup','unitHinge','unitDrawer','unitLeg'];
const priceKey='kw54_prices_v1';
const money=n=>Number(n).toLocaleString('pl-PL',{minimumFractionDigits:2,maximumFractionDigits:2})+' zł';
const n=id=>Number($(id)?.value||0);
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[c]))}
try{let old=JSON.parse(localStorage.getItem(priceKey)||'{}');for(const id of ids)if(Number.isFinite(Number(old[id]))&&old[id]!==undefined)$(id).value=old[id]}catch(e){}
function getParts(){try{return calc()}catch(e){return []}}
function metrics(parts){
 let area=0,edge=0;
 for(const part of parts){
  if(!(part.t>0&&part.l>0&&part.b>0))continue;
  area+=part.l*part.b*part.qty/1e6;
  if(/^(Front|Półka)/.test(part.name))edge+=2*(part.l+part.b)*part.qty/1000;
 }
 return {area,edge};
}
function update(){
 const parts=getParts(),m=metrics(parts),values=ids.map(n);
 const ok=values.every(v=>Number.isFinite(v)&&v>=0)&&n('costMarkup')<=1000;
 const panel=$('kw54Price');
 if(!ok){panel.textContent='Sprawdź ceny i narzut: wartości muszą być nieujemne, narzut maksymalnie 1000%.';return}
 const edgeMeters=window.KW55?window.KW55.edgeMeters(parts):m.edge;
 const autoCost=window.KW55&&$('autoHardware').value==='yes'?window.KW55.hardwareCost():0;
 const board=m.area*n('costBoard'),edges=edgeMeters*n('costEdge');
 const direct=board+edges+autoCost+n('costHardware')+n('costLabor')+n('costInstall');
 const quote=direct*(1+n('costMarkup')/100);
 panel.innerHTML=`<b>Powierzchnia:</b> ${m.area.toFixed(3)} m² · <b>obrzeże orient.:</b> ${edgeMeters.toFixed(2)} mb<br>
 <b>Płyty:</b> ${money(board)} · <b>obrzeża:</b> ${money(edges)} · <b>okucia auto:</b> ${money(autoCost)}<br>
 <b>Koszt razem:</b> ${money(direct)}<br><b>Cena ofertowa (narzut):</b> ${money(quote)}
 <p class="muted">Narzut ≠ marża. Bez VAT, odpadu materiałowego i podatków. Profile GOLA nie są wliczone automatycznie do ceny okuć.</p>`;
 $('kw54Edges').innerHTML='<table><thead><tr><th>Element</th><th>Ilość</th><th>Obrzeże orient.</th></tr></thead><tbody>'+
 parts.filter(x=>x.t>0&&x.l>0&&x.b>0).map(x=>`<tr><td>${safe(x.name)}</td><td>${x.qty}</td><td>${window.KW55?window.KW55.edgeForPart(x).toFixed(2)+' mb':(/^(Front|Półka)/.test(x.name)?(2*(x.l+x.b)*x.qty/1000).toFixed(2)+' mb':'do określenia')}</td></tr>`).join('')+'</tbody></table>';
 const count=n('drawerCount'),length=n('runnerLength'),height=$('drawerSideHeight').value,system=$('drawerSystem').value;
 $('kw54Hardware').innerHTML=count>0?`<b>${count} szuflad</b> — ${safe(system==='sevroll'?'Sevroll':system==='blum-legrabox'?'Blum LEGRABOX':'system ogólny')}, długość nominalna ${length} mm, wariant ${safe(height)}.<br>
 Zestawienie orientacyjne: ${count} par prowadnic, ${count} kompletów boków (jeśli system wymaga), ${count} kompletów mocowań frontów, elementy dna i pleców do osobnego zwymiarowania.<br><b>Uwaga:</b> sprawdź kompatybilność wymiarów i kodów w katalogu producenta.`:'Nie wybrano szuflad.';
}
for(const id of ids)$(id).addEventListener('input',()=>{
 try{localStorage.setItem(priceKey,JSON.stringify(Object.fromEntries(ids.map(x=>[x,$(x).value]))))}catch(e){}
 update();
});
const originalRender=render;
render=function(){originalRender();update()};
const history=[],future=[];
let last=snapshot(),applying=false;
function snapshot(){const state=get();delete state.updated;return JSON.stringify(state)}
function changed(){
 if(applying)return;
 const now=snapshot();
 if(now===last)return;
 history.push(last);if(history.length>60)history.shift();
 last=now;future.length=0;
}
document.getElementById('editor').addEventListener('change',e=>{
 if(!e.target.matches('input,select,textarea'))return;
 changed();update();
},true);
document.getElementById('editor').addEventListener('focusin',e=>{
 if(e.target.matches('input,select,textarea')){const now=snapshot();if(now!==last){last=now}}
},true);
function restore(serial){
 try{applying=true;set(JSON.parse(serial));last=snapshot();update()}finally{applying=false}
}
$('kw54Undo').addEventListener('click',()=>{
 changed();
 if(!history.length)return alert('Brak zmiany do cofnięcia.');
 future.push(snapshot());restore(history.pop());
});
$('kw54Redo').addEventListener('click',()=>{
 if(!future.length)return alert('Brak zmiany do ponowienia.');
 history.push(snapshot());restore(future.pop());
});
$('kw54Export').addEventListener('click',()=>{
 const parts=getParts();
 if(!parts.length)return alert('Sprawdź parametry szafki.');
 const escapeCsv=v=>'"'+String(v).replace(/"/g,'""')+'"';
 const lines=[['Element','Ilosc','Dlugosc mm','Szerokosc mm','Grubosc mm','Dekor','Uwagi technologiczne'],
 ...parts.map(x=>[x.name,x.qty,x.l,x.b,x.t,x.decor,/(GOLA|zacięcie|frez J)/i.test(x.name)?'Sprawdz technologie i mocowania':'Wymiary orientacyjne'])];
 const csv='\uFEFF'+lines.map(line=>line.map(escapeCsv).join(';')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='KORDZIKWOOD_5_5_formatki.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
});
window.KW54Update=update;
document.getElementById('production').addEventListener('click',update);
update();
})();
