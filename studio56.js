/* KORDZIKWOOD 5.6 — parametric production aids; offline, no external libraries. */
(function(){
'use strict';
const $=id=>document.getElementById(id), n=id=>Number($(id)?.value), str=id=>String($(id)?.value||'');
const ids=['v56DrawerBuild','v56DrawerT','v56SideClear','v56BackClear','v56BoxH','v56BottomT','v56Opening','v56DrawerDepth','v56Slide','v56Leaves','v56SlideW','v56SlideH','v56Overlap','v56SlideGap','v56Track','v56SlideProfile','v56SheetL','v56SheetW','v56Kerf','v56Rotate','v56DrillX','v56DrillY','v56DrillDia','v56DrillDepth','v56DrillCount','v56DrillPitch','v56Origin'];
const key='kwstudio_56_engineering_v1';
const safe=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function drawerGeometry(){
 if(str('v56DrawerBuild')!=='on'||n('drawerCount')<1)return null;
 const count=n('drawerCount'),t=n('v56DrawerT'),clearance=n('v56SideClear'),bottom=n('v56BottomT');
 const opening=n('v56Opening')||n('w')-2*n('t');
 const width=opening-2*clearance;
 const depth=n('v56DrawerDepth')||n('d')-n('v56BackClear');
 const boxH=n('v56BoxH');
 if(!Number.isInteger(count)||count>8||count<1||t<8||t>25||bottom<3||bottom>25||clearance<0||clearance>60||width<=2*t+20||depth<=2*t+20||depth>1000||boxH<=bottom+20||boxH>500||count*boxH>n('h')-2*n('t'))return null;
 return {count,t,bottom,clearance,opening,width,depth,boxH};
}
function drawerParts(){const g=drawerGeometry();if(!g)return [];const decor=$('carcassDecor').value;return [
 {name:'Szuflada 5.6 — bok skrzynki',qty:g.count*2,l:g.depth,b:g.boxH,t:g.t,decor},
 {name:'Szuflada 5.6 — przód skrzynki',qty:g.count,l:g.width-2*g.t,b:g.boxH,t:g.t,decor},
 {name:'Szuflada 5.6 — tył skrzynki',qty:g.count,l:g.width-2*g.t,b:g.boxH,t:g.t,decor},
 {name:'Szuflada 5.6 — dno nakładane (wariant)',qty:g.count,l:g.width,b:g.depth,t:g.bottom,decor}
 ];}
function slidingOn(){return str('v56Slide')==='on'}
function sliding(){if(!slidingOn())return null;const leaves=n('v56Leaves'),w=n('v56SlideW')||n('w'),h=n('v56SlideH')||n('h'),overlap=n('v56Overlap'),gap=n('v56SlideGap');
 if(![2,3,4].includes(leaves)||w<300||w>6000||h<300||h>3500||overlap<0||overlap>120||gap<0||gap>150||h-gap<=200)return null;
 return {leaves,w,h,overlap,gap,leafW:(w+(leaves-1)*overlap)/leaves,leafH:h-gap,track:str('v56Track'),profile:str('v56SlideProfile')};}
function slideParts(){const x=sliding();if(!x)return [];return [
 {name:'Przesuwne 5.6 — wypełnienie skrzydła (wymiar schematyczny)',qty:x.leaves,l:x.leafH,b:x.leafW,t:n('t'),decor:$('frontDecor').value},
 {name:'Przesuwne 5.6 — tor górny (mb do zakupu)',qty:1,l:x.w,b:0,t:0,decor:x.profile},
 {name:'Przesuwne 5.6 — tor dolny (mb do zakupu)',qty:1,l:x.w,b:0,t:0,decor:x.profile},
 {name:'Przesuwne 5.6 — profil pionowy (mm, do weryfikacji)',qty:x.leaves*2,l:x.leafH,b:0,t:0,decor:x.profile}
 ];}
window.KW56={drawerGeometry,drawersOn:()=>str('v56DrawerBuild')==='on',slidingOn,sliding};
try{const stored=JSON.parse(localStorage.getItem(key)||'{}');for(const id of ids)if(stored[id]!==undefined)$(id).value=stored[id]}catch(e){}
const calcOriginal=calc;
calc=function(){const p=calcOriginal();if(!p.length)return p;return (slidingOn()?p.filter(item=>!item.name.startsWith('Front')):p).concat(drawerParts(),slideParts())};
function svgBox(title,rows){return '<div style="overflow:auto"><svg viewBox="0 0 500 180" style="width:100%;max-width:550px;height:auto" role="img" aria-label="'+safe(title)+'"><rect x="12" y="10" width="476" height="160" rx="9" fill="#23383c" stroke="#78959b"/>'+rows+'</svg></div>'}
function drawerSketch(g){if(!g)return '';const w=340,h=115;return svgBox('Skrzynka szuflady, schemat',`<rect x="80" y="28" width="${w}" height="${h}" fill="#a8b6b5" stroke="#e5eeeb" stroke-width="2"/><rect x="95" y="41" width="310" height="85" fill="#344b50" stroke="#e5eeeb"/><text x="250" y="96" fill="white" text-anchor="middle" font-size="16">${Math.round(g.width)} × ${Math.round(g.depth)} mm</text><text x="250" y="156" fill="white" text-anchor="middle" font-size="12">Schemat skrzynki, nie rysunek montażowy</text>`)}
function slideSketch(x){if(!x)return '';let r='';const start=40,drawW=420/x.leaves;for(let i=0;i<x.leaves;i++){const px=start+i*drawW;r+=`<rect x="${px}" y="35" width="${drawW+8}" height="100" fill="${i%2?'#4b747d':'#7f9ba2'}" stroke="#dce5e5" stroke-width="2"/><text x="${px+drawW/2}" y="88" fill="white" text-anchor="middle" font-size="15">${i+1}</text>`}return svgBox('Drzwi przesuwne, widok od frontu',r+`<text x="250" y="156" fill="white" text-anchor="middle" font-size="12">Skrzydło ~${x.leafW.toFixed(1)} × ${x.leafH.toFixed(1)} mm</text>`)}
function cutParts(){return calc().filter(p=>p.l>0&&p.b>0&&p.t>0&&p.qty>0)}
function nest(){
 const L=n('v56SheetL'),W=n('v56SheetW'),kerf=n('v56Kerf'),rotate=str('v56Rotate')==='yes';
 if(!Number.isFinite(L)||!Number.isFinite(W)||L<300||W<300||kerf<0||kerf>15)return {error:'Nieprawidłowy format płyty lub rzaz.'};
 const groups=new Map();for(const p of cutParts()){const key=String(p.decor)+' / '+p.t+' mm';if(!groups.has(key))groups.set(key,[]);for(let i=0;i<p.qty;i++)groups.get(key).push({name:p.name,l:p.l,b:p.b,decor:p.decor,t:p.t})}
 const sheets=[],unfit=[];for(const [group,items] of groups){items.sort((a,b)=>b.l*b.b-a.l*a.b);let current=null;
 for(const p of items){let placed=false;
  for(const sheet of sheets.filter(s=>s.group===group)){
   for(const orientation of rotate?[[p.l,p.b,false],[p.b,p.l,true]]:[[p.l,p.b,false]]){
    const [l,b,turned]=orientation;let x=sheet.x,y=sheet.y,rowH=sheet.rowH;
    if(x+l>L){x=0;y+=rowH+kerf;rowH=0}
    if(y+b<=W&&x+l<=L){sheet.items.push({...p,x,y,l,b,turned});sheet.x=x+l+kerf;sheet.y=y;sheet.rowH=Math.max(rowH,b);placed=true;break}
   }if(placed)break;
  }
  if(!placed){let options=rotate?[[p.l,p.b,false],[p.b,p.l,true]]:[[p.l,p.b,false]];const o=options.find(v=>v[0]<=L&&v[1]<=W);if(!o){unfit.push(p);continue}
   current={group,L,W,x:o[0]+kerf,y:0,rowH:o[1],items:[{...p,x:0,y:0,l:o[0],b:o[1],turned:o[2]}]};sheets.push(current);
  }
 }
 }
 return {sheets,unfit,L,W,kerf};
}
function drill(){const parts=cutParts(),idx=Number(str('v56DrillPart')),p=parts[idx];if(!p)return {error:'Wybierz formatkę.'};const x=n('v56DrillX'),y=n('v56DrillY'),dia=n('v56DrillDia'),depth=n('v56DrillDepth'),count=n('v56DrillCount'),pitch=n('v56DrillPitch');
 if(!Number.isInteger(count)||count<1||count>30||x<0||y<0||dia<=0||depth<=0||pitch<=0||depth>p.t||x+dia/2>p.b||x-dia/2<0||y-dia/2<0||y+(count-1)*pitch+dia/2>p.l)return {error:'Nawierty wychodzą poza formatkę albo głębokość przekracza grubość. Zmień parametry.'};
 const points=Array.from({length:count},(_,i)=>({x,y:str('v56Origin')==='left-top'?p.l-(y+i*pitch):y+i*pitch,diameter:dia,depth}));return {part:p,points};}
let prevPartsSignature='';
function update(){
 const dg=drawerGeometry(),drawers=n('drawerCount');
 $('v56DrawerResult').innerHTML=str('v56DrawerBuild')==='off'?'Skrzynki wyłączone; nadal obowiązuje zestawienie okuć z wersji 5.5.':dg?`<b>${dg.count} skrzynek</b> — szerokość zewnętrzna ${dg.width.toFixed(1)} mm, głębokość ${dg.depth.toFixed(1)} mm, wysokość ${dg.boxH.toFixed(1)} mm. Formatki: ${drawerParts().reduce((a,p)=>a+p.qty,0)} szt. <b>Uwaga:</b> parametry luzów wpisujesz samodzielnie; przy metalowych bokach Sevroll/Blum dno i plecy mogą wymagać innych wzorów.`:'Nie można obliczyć skrzynek. Sprawdź liczbę szuflad, światło, grubości, luzy i wysokość korpusu.';
 $('v56DrawerSketch').innerHTML=drawerSketch(dg);
 const sl=sliding();$('v56SlideResult').innerHTML=!slidingOn()?'Drzwi przesuwne wyłączone.':sl?`<b>${sl.leaves} skrzydła</b>, ${sl.track}; każde orientacyjnie <b>${sl.leafW.toFixed(1)} × ${sl.leafH.toFixed(1)} mm</b>. Tory: po ${sl.w} mm. Profil: ${safe(sl.profile)}. <b>Ważne:</b> to wymiar światła z zakładką, a nie zweryfikowany wymiar cięcia wypełnienia lub profili Sevroll.`:'Nieprawidłowe wymiary światła lub zakładki.';
 $('v56SlideSketch').innerHTML=slideSketch(sl);
 const result=nest();const count=result.sheets?.length||0;const waste=result.sheets?.reduce((a,s)=>a+s.items.reduce((b,i)=>b+i.l*i.b,0),0)||0;
 $('v56NestingResult').innerHTML=result.error?safe(result.error):`<b>${count} arkuszy</b> dla ${new Set(result.sheets.map(s=>s.group)).size} grup materiał/grubość. Niepasujące formatki: <b>${result.unfit.length}</b>. Orientacyjny stopień wykorzystania (bez rzazu): <b>${count?(100*waste/(count*result.L*result.W)).toFixed(1):'0'}%</b>. Układ rzędowy, bez optymalizacji przemysłowej.`;
 $('v56NestingPreview').innerHTML=result.error?'':result.sheets.slice(0,5).map((sheet,i)=>{const scale=440/Math.max(sheet.L,sheet.W);let boxes=sheet.items.map(p=>`<rect x="${p.x*scale}" y="${p.y*scale}" width="${p.l*scale}" height="${p.b*scale}" fill="#6c9098" stroke="white" stroke-width="1"><title>${safe(p.name)} ${p.l}×${p.b}</title></rect>`).join('');return `<div><small>Arkusz ${i+1}: ${safe(sheet.group)} — ${sheet.items.length} formatek</small><svg viewBox="0 0 ${sheet.L*scale} ${sheet.W*scale}" style="display:block;max-width:440px;width:100%;background:#2a373a;margin:5px 0 14px" aria-label="Plan rozkroju arkusza ${i+1}">${boxes}</svg></div>`}).join('')+(count>5?`<p>Pozostałe ${count-5} arkuszy w eksporcie CSV.</p>`:'');
 const parts=cutParts();const signature=parts.map(p=>[p.name,p.l,p.b,p.t,p.qty].join('|')).join('~');if(signature!==prevPartsSignature){const selected=$('v56DrillPart').value;$('v56DrillPart').innerHTML=parts.map((p,i)=>`<option value="${i}">${safe(p.name)} — ${p.l} × ${p.b} × ${p.t}</option>`).join('');if(parts[Number(selected)])$('v56DrillPart').value=selected;prevPartsSignature=signature}
 const dr=drill();$('v56DrillResult').innerHTML=dr.error?safe(dr.error):`<b>${dr.points.length} nawierty</b> w formatce „${safe(dr.part.name)}”, ø ${dr.points[0].diameter} mm, głębokość ${dr.points[0].depth} mm. Punkty (X,Y): ${dr.points.map(p=>`(${p.x}, ${p.y})`).join(', ')}.`;
}
window.KW56.nest=nest;window.KW56.drill=drill;window.KW56.drawerParts=drawerParts;window.KW56.slideParts=slideParts;
const oldRender=render;render=function(){oldRender();update()};
for(const id of ids){$(id).addEventListener('input',()=>{try{localStorage.setItem(key,JSON.stringify(Object.fromEntries(ids.map(i=>[i,$(i).value]))))}catch(e){}render()})}
$('v56DrillPart').addEventListener('change',update);
function csv(filename,rows){const content='\uFEFF'+rows.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(';')).join('\r\n');const blob=new Blob([content],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}
$('v56ExportParts').addEventListener('click',()=>csv('KORDZIKWOOD_5_6_formatki.csv',[['Nazwa','Ilosc','Dlugosc mm','Szerokosc mm','Grubosc mm','Dekor','Status'],...calc().map(p=>[p.name,p.qty,p.l,p.b,p.t,p.decor,p.name.includes('5.6')?'Weryfikacja technologii wymagana':'Wymiar orientacyjny'])]));
$('v56ExportNest').addEventListener('click',()=>{const res=nest();if(res.error)return alert(res.error);csv('KORDZIKWOOD_5_6_rozkrój.csv',[['Arkusz','Grupa','Formatka','X mm','Y mm','Dlugosc mm','Szerokosc mm','Obrot 90'],...res.sheets.flatMap((s,i)=>s.items.map(p=>[i+1,s.group,p.name,p.x,p.y,p.l,p.b,p.turned?'TAK':'NIE'])),...res.unfit.map(p=>['BRAK MIEJSCA',p.decor,p.name,'','',p.l,p.b,''])])});
$('v56ExportDrill').addEventListener('click',()=>{const d=drill();if(d.error)return alert(d.error);csv('KORDZIKWOOD_5_6_nawierty.csv',[['Formatka','X mm','Y mm','Srednica mm','Glebokosc mm','Narożnik'],...d.points.map(p=>[d.part.name,p.x,p.y,p.diameter,p.depth,str('v56Origin')])])});
update();
})();
