document.querySelectorAll('.service-hot').forEach(el=>el.addEventListener('click',()=>{const s=document.getElementById('ibAppliance');s.value=el.dataset.appliance;}));
document.getElementById('inlineBookingForm').addEventListener('submit',function(e){
 e.preventDefault();
 const v=id=>document.getElementById(id).value.trim();
 const msg=`Hello Quick Service Center,%0A%0ASERVICE BOOKING REQUEST%0AName: ${encodeURIComponent(v('ibName'))}%0AMobile: ${encodeURIComponent(v('ibMobile'))}%0AAddress: ${encodeURIComponent(v('ibAddress'))}%0APreferred Date: ${encodeURIComponent(v('ibDate')||'Not specified')}%0AAppliance: ${encodeURIComponent(v('ibAppliance'))}%0APreferred Time: ${encodeURIComponent(v('ibTime')||'Not specified')}%0AProblem Description: ${encodeURIComponent(v('ibProblem'))}`;
 window.open('https://wa.me/918101368998?text='+msg,'_blank');
});

document.querySelectorAll('[data-pro-appliance]').forEach(el=>el.addEventListener('click',()=>{setTimeout(()=>{const s=document.getElementById('pbAppliance'); if(s)s.value=el.dataset.proAppliance;},50);}));
document.getElementById('proBookingForm').addEventListener('submit',function(e){
 e.preventDefault(); const v=id=>document.getElementById(id).value.trim();
 const msg=`Hello Quick Service Center,%0A%0ASERVICE BOOKING REQUEST%0AName: ${encodeURIComponent(v('pbName'))}%0AMobile: ${encodeURIComponent(v('pbMobile'))}%0AAddress: ${encodeURIComponent(v('pbAddress'))}%0APreferred Date: ${encodeURIComponent(v('pbDate')||'Not specified')}%0AAppliance: ${encodeURIComponent(v('pbAppliance'))}%0APreferred Time: ${encodeURIComponent(v('pbTime')||'Not specified')}%0AProblem Description: ${encodeURIComponent(v('pbProblem'))}`;
 window.open('https://wa.me/918101368998?text='+msg,'_blank');
});

/* Customer Reviews: only photo, name and review text rotate inside the fixed review area. */
(function(){
  const reviews = [
    {name:'Rakesh Mondal', photo:'assets/review_rakesh.jpg', text:'খুব ভালো সার্ভিস, সময় মত কাজ হয়েছে।'},
    {name:'Ramesh Mondal', photo:'assets/review_ramesh.jpg', text:'কাজ খুব সুন্দর হয়েছে, ব্যবহারও ভালো ছিল।'},
    {name:'Puja Saha', photo:'assets/review_puja.jpg', text:'সময়মতো এসে সমস্যাটা দ্রুত ঠিক করে দিয়েছেন।'},
    {name:'Rahul Dey', photo:'assets/review_rahul.jpg', text:'ওয়াশিং মেশিনের সার্ভিস খুব ভালো হয়েছে।'},
    {name:'Mita Roy', photo:'assets/review_mita.jpg', text:'সার্ভিস ভালো, পরিষ্কারভাবে সব বুঝিয়ে দিয়েছেন।'},
    {name:'Amit Ghosh', photo:'assets/review_amit.jpg', text:'ভালো কাজ, যুক্তিসঙ্গত চার্জ এবং সময়মতো সার্ভিস।'}
  ];
  const photo=document.getElementById('reviewPhoto');
  const name=document.getElementById('reviewName');
  const text=document.getElementById('reviewText');
  if(!photo || !name || !text) return;
  let i=0;
  function showReview(n){
    i=(n+reviews.length)%reviews.length;
    const r=reviews[i];
    photo.src=r.photo;
    name.textContent=r.name;
    text.textContent=r.text;
  }
  // The fixed arrows in the original artwork remain where they are; these invisible click zones only handle review navigation.
  const next=document.createElement('button');
  const prev=document.createElement('button');
  [prev,next].forEach(b=>{b.type='button';b.style.position='absolute';b.style.top='76.75%';b.style.height='7.15%';b.style.width='4.2%';b.style.zIndex='21';b.style.border='0';b.style.background='transparent';b.style.cursor='pointer';b.setAttribute('aria-label','Change customer review');});
  prev.style.left='56.5%'; next.style.left='94.5%';
  document.querySelector('.page').append(prev,next);
  prev.addEventListener('click',()=>showReview(i-1));
  next.addEventListener('click',()=>showReview(i+1));
  setInterval(()=>showReview(i+1),5000);
})();
