const menuBtn=document.getElementById('menuBtn'),menu=document.getElementById('menu');
menuBtn.addEventListener('click',()=>{const o=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o);});
const glow=document.getElementById('glow');
if(glow&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  let x=0,y=0,t=false;
  const move=(a,b)=>{x=a;y=b;glow.classList.add('on');if(!t){t=true;requestAnimationFrame(()=>{glow.style.transform='translate('+x+'px,'+y+'px)';t=false;});}};
  window.addEventListener('pointermove',e=>move(e.clientX,e.clientY));
  window.addEventListener('touchmove',e=>move(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  window.addEventListener('touchstart',e=>move(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  document.addEventListener('mouseleave',()=>glow.classList.remove('on'));
}
