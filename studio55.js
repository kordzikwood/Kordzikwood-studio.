/* KORDZIKWOOD 5.5 — Sevroll, AXILO, edge presets and hardware estimates */
(function(){
'use strict';
const $=id=>document.getElementById(id),num=id=>Number($(id)?.value||0);
const edgeKey='kw55_edges_v1',hardwareKey='kw55_hardware_v1';
const groups=[
 {id:'front',name:'Fronty',match:p=>p.name.startsWith('Front'),defaults:[1,1,1,1]},
 {id:'shelf',name:'Półki',match:p=>p.name.startsWith('Półka'),defaults:[1,0,0,0]},
 {id:'side',name:'Boki korpusu',match:p=>p.name==='Bok',defaults:[1,0,0,0]},
 {id:'top',name:'Wieńce i przegrody',match:p=>/Wieniec|Przegroda/.test(p.name),defaults:[1,0,0,0]},
 {id:'back',name:'Plecy',match:p=>p.name.startsWith('Plecy'),defaults:[0,0,0,0]},
 {id:'other',name:'Pozostałe formatki',match:p=>true,defaults:[0,0,0,0]}
];
let stored={};try{stored=JSON.parse(localStorage.getItem(edgeKey)||'{}')}catch(e){}
const edges={};for(const g of groups)edges[g.id]=Array.isArray(stored[g.id])&&stored[g.id].length===4?stored[g.id].map(x=>!!x):g.defaults.slice();
function category(part){return groups.find(g=>g.match(part))}
function edgeForPart(p){if(!(p.l>0&&p.b>0&&p.qty>0&&p.t>0))return 0;const e=edges[category(p).id];return ((e[0]+e[1])*p.l+(e[2]+e[3])*p.b)*p.qty/1000}
function edgeMeters(parts){return parts.reduce((sum,p)=>sum+edgeForPart(p),0)}
const edgeUI=$('kw55EdgeEditor');
edgeUI.innerHTML=groups.map(g=>`<fieldset style="border:1px solid #3a474a;border-radius:10px;margin:8px 0;padding:10px"><legend>${g.name}</legend><div style="display:flex;flex-wrap:wrap;gap:16px">${['D1','D2','K1','K2'].map((e,i)=>`<label style="display:flex;align-items:center;gap:6px"><input type="checkbox" data-group="${g.id}" data-edge="${i}" ${edges[g.id][i]?'checked':''} style="width:20px;height:20px"> ${e}</label>`).join('')}</div></fieldset>`).join('');
edgeUI.addEventListener('change',e=>{
 const el=e.target;if(!el.matches('[data-group][data-edge]'))return;
 edges[el.dataset.group][Number(el.dataset.edge)]=el.checked;
 try{localStorage.setItem(edgeKey,JSON.stringify(edges))}catch(e){}
 render();
});
function hingeCount(){
 if($('hingeMode').value==='none'||$('doorUse').value!=='hinged')return 0;
 const fronts=num('front'),h=num('h'),mode=$('hingeMode').value;
 if(fronts<=0)return 0;
 const per=mode==='manual'?num('hingesPerFront'):h<=900?2:h<=1600?3:h<=2200?4:5;
 return fronts*Math.max(0,Math.min(12,per));
}
function legCount(){
 if($('legSystem').value==='none'||$('type').value!=='base')return 0;
 const spacing=Math.max(200,num('legSpacing'));
 return 2*Math.max(2,Math.ceil(num('w')/spacing)+1);
}
function hardwareCost(){return hingeCount()*num('unitHinge')+num('drawerCount')*num('unitDrawer')+legCount()*num('unitLeg')}
function hardwareRows(){
 const rows=[],hinges=hingeCount(),drawers=num('drawerCount'),legs=legCount();
 if(hinges)rows.push(['Zawiasy '+$('hingeSystem').selectedOptions[0].text,hinges,'szt.',num('unitHinge')]);
 if(drawers)rows.push(['Szuflady '+$('drawerSystem').selectedOptions[0].text+' / '+$('runnerLength').value+' mm / '+$('drawerSideHeight').value,drawers,'kpl.',num('unitDrawer')]);
 if(legs)rows.push(['Nóżki '+$('legSystem').selectedOptions[0].text+' / ustawienie '+num('legHeight')+' mm',legs,'szt.',num('unitLeg')]);
 return rows;
}
function show(){
 const hinges=hingeCount(),legs=legCount(),drawers=num('drawerCount');
 $('kw55Bom').innerHTML=`<b>Zestawienie orientacyjne:</b><br>Zawiasy: <b>${hinges} szt.</b> (${ $('hingeSystem').selectedOptions[0].text })<br>
 Szuflady: <b>${drawers} kpl.</b> (${ $('drawerSystem').selectedOptions[0].text })<br>
 Nóżki: <b>${legs} szt.</b> (${ $('legSystem').selectedOptions[0].text })<br>
 Obrzeża: <b>${edgeMeters(calc()).toFixed(2)} mb</b><br>
 Koszt okuć z cennika: <b>${hardwareCost().toFixed(2)} zł</b>
 <p class="muted">Szacunki liczby zawiasów zależą tylko od wysokości frontu. Nie uwzględniają masy, szerokości, materiału ani sposobu otwierania. Nóżki nie są sprawdzone pod względem nośności. Wymiary i kompatybilność potwierdź u producenta.</p>`;
}
window.KW55={edgeForPart,edgeMeters,hardwareCost,hardwareRows,hingeCount,legCount};
const priceIds=['unitHinge','unitDrawer','unitLeg','autoHardware'];
try{const data=JSON.parse(localStorage.getItem(hardwareKey)||'{}');for(const id of priceIds)if(data[id]!==undefined)$(id).value=data[id]}catch(e){}
for(const id of priceIds)$(id).addEventListener('change',()=>{
 try{localStorage.setItem(hardwareKey,JSON.stringify(Object.fromEntries(priceIds.map(x=>[x,$(x).value]))))}catch(e){}
 render();
});
const oldRender=render;render=function(){oldRender();show()};
$('editor').addEventListener('input',e=>{if(e.target.matches('input,select,textarea')){window.KW54Update?.();show()}},false);
$('editor').addEventListener('change',e=>{if(e.target.matches('input,select,textarea')){window.KW54Update?.();show()}},false);
function exportCsv(name,rows){
 const csv='\uFEFF'+rows.map(row=>row.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(';')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
}
$('kw55ExportHardware').addEventListener('click',()=>{
 exportCsv('KORDZIKWOOD_5_5_okucia.csv',[['Pozycja','Ilość','Jednostka','Cena jedn. PLN','Wartość PLN'],...hardwareRows().map(r=>[...r,r[1]*r[3]])]);
});
$('kw55Duplicate').addEventListener('click',()=>{
 const copy=get();copy.id=crypto.randomUUID?crypto.randomUUID():String(Date.now())+'-kopia';
 copy.name=String(copy.name||'Szafka')+' — kopia';
 set(copy);
 const save=$('save');if(save)save.click();
 show();
 alert('Utworzono i zapisano kopię szafki. Oryginał pozostał bez zmian.');
});
$('production').addEventListener('click',show);
render();
})();
