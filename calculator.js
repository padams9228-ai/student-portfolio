const out=document.getElementById('display'),sub=document.getElementById('expr'),hist=document.getElementById('history');
let cur='0',prev=null,op=null,fresh=false,history=[];
function show(){out.textContent=cur;sub.textContent=(prev!==null&&op)?prev+' '+op:'';}
function calc(a,b,o){a=parseFloat(a);b=parseFloat(b);
  if(o==='+')return a+b;if(o==='−')return a-b;if(o==='×')return a*b;
  if(o==='÷')return b===0?null:a/b;return b;}
function fmt(n){return n===null?'Cannot divide by 0':String(parseFloat(n.toPrecision(12)));}
function equals(){
  if(op===null||prev===null)return;
  const r=calc(prev,cur,op);const text=prev+' '+op+' '+cur+' = '+fmt(r);
  history.unshift(text);history=history.slice(0,5);renderHistory();
  cur=fmt(r);prev=null;op=null;fresh=true;show();
}
function renderHistory(){hist.innerHTML='';history.forEach(h=>{const li=document.createElement('li');li.textContent=h;hist.appendChild(li);});}
document.querySelector('.keys').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;const k=b.dataset.k;
  if(/^\d$/.test(k)){cur=(cur==='0'||fresh)?k:cur+k;fresh=false;}
  else if(k==='.'){if(fresh){cur='0.';fresh=false;}else if(!cur.includes('.'))cur+='.';}
  else if(k==='C'){cur='0';prev=null;op=null;fresh=false;}
  else if(k==='DEL'){cur=cur.length>1&&!fresh?cur.slice(0,-1):'0';}
  else if(k==='%'){cur=fmt(parseFloat(cur)/100);}
  else if(k==='='){equals();return;}
  else{if(op!==null&&!fresh)equals();prev=cur;op=k;fresh=true;}
  show();
});
show();
