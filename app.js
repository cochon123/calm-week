const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];const $=i=>document.getElementById(i);
let tasks=JSON.parse(localStorage.getItem('cw')||'[]');let prefs=JSON.parse(localStorage.getItem('cwp')||'{}');
$('d').innerHTML=days.map((d,i)=>`<option value="${i}">${d}</option>`).join('');$('d').value=(new Date().getDay()+6)%7;
const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function save(){localStorage.setItem('cw',JSON.stringify(tasks));draw()}
function draw(){const today=(new Date().getDay()+6)%7;const next=tasks.filter(t=>!t.done).sort((a,b)=>((a.d-today+7)%7)-((b.d-today+7)%7)||a.e-b.e)[0];
$('now').textContent=next?`${next.t} (${days[next.d]})`:'Nothing planned. Enjoy the calm 🌿';$('done').hidden=!next;
$('week').innerHTML=days.map((d,i)=>{const ts=tasks.filter(t=>t.d==i&&!t.done);const load=ts.reduce((s,t)=>s+ +t.e,0);
return `<div class="day ${load>5?'heavy':''}" aria-label="${d}, ${ts.length} tasks"><h3>${d}${load>5?' ⚠️':''}</h3>${ts.map(t=>`<div class="task"><span>${['','🟢','🟡','🔴'][t.e]} ${esc(t.t)}</span><button aria-label="Remove ${esc(t.t)}" data-id="${t.id}">✕</button></div>`).join('')}</div>`}).join('');
const heavy=days.filter((d,i)=>tasks.filter(t=>t.d==i&&!t.done).reduce((s,t)=>s+ +t.e,0)>5);
$('load').textContent=heavy.length?`Heads up: ${heavy.join(', ')} look heavy. Consider moving a 🔴 task.`:'Your week looks balanced.'}
$('f').onsubmit=e=>{e.preventDefault();tasks.push({id:Date.now(),t:$('t').value.trim(),d:+$('d').value,e:+$('e').value,done:false});$('t').value='';save()};
$('done').onclick=()=>{const today=(new Date().getDay()+6)%7;const n=tasks.filter(t=>!t.done).sort((a,b)=>((a.d-today+7)%7)-((b.d-today+7)%7)||a.e-b.e)[0];if(n){n.done=true;save()}};
$('week').onclick=e=>{const id=e.target.dataset.id;if(id){tasks=tasks.filter(t=>t.id!=id);save()}};
function tog(btn,cls){const on=document.documentElement.classList.toggle(cls);btn.setAttribute('aria-pressed',on);prefs[cls]=on;localStorage.setItem('cwp',JSON.stringify(prefs))}
[['theme','dark'],['contrast','hc'],['bigtext','big']].forEach(([b,c])=>{$(b).onclick=()=>tog($(b),c);if(prefs[c]){document.documentElement.classList.add(c);$(b).setAttribute('aria-pressed',true)}});
if(!('dark' in prefs)&&matchMedia('(prefers-color-scheme: dark)').matches)tog($('theme'),'dark');draw();
