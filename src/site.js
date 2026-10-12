(()=>{const __modules={};
__modules.ui=(()=>{
const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let restoreFocus;
function closeModal(){document.getElementById('overlay').innerHTML='';document.body.classList.remove('modal-open');restoreFocus?.focus();}
function modal(title,content,{wide=false}={}){
  restoreFocus=document.activeElement;document.body.classList.add('modal-open');
  document.getElementById('overlay').innerHTML=`<div class="modal-backdrop"><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><h2 id="modal-title">${escape(title)}</h2><button class="text-control" data-action="close-modal" aria-label="Close dialog">Close</button></header>${content}</section></div>`;
  queueMicrotask(()=>document.querySelector('.modal input,.modal button,.modal select')?.focus());
}
document.addEventListener('keydown',event=>{if(!document.querySelector('.modal'))return;if(event.key==='Escape')closeModal();if(event.key==='Tab'){const elements=[...document.querySelectorAll('.modal button,.modal input,.modal select,.modal textarea,.modal a')].filter(e=>!e.disabled&&e.offsetParent!==null);const first=elements[0],last=elements.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});

return {modal,closeModal};})();
function solution(index){const data=[['Keep the appointment. Skip the admin.','Give customers a convenient way to ask, choose a time, and get a confirmation. Keep your team focused on the people in front of them.',['Service and appointment enquiries','Availability checks and booking details','Human review when a request needs care'],'Consultation request','Tomorrow · 3:00 PM'],['A warm welcome, before they arrive.','Guide guests through everyday enquiries, stay preferences, and reservation requests, with a clear handoff to your hospitality team.',['Room and amenity questions','Stay dates and guest preferences','Reservation requests for team review'],'Reservation enquiry','2 guests · Weekend stay'],['Every new enquiry has a next step.','Capture the right details for your service team. Help customers explain what they need and keep the conversation moving.',['Service information and enquiries','Lead details and follow-up workflows','A shared inbox for your team'],'Service enquiry','New customer · Follow-up needed']][index];return `<div><h3>${data[0]}</h3><p>${data[1]}</p><ul class="check-list">${data[2].map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="solution-sample"><div class="sample-row"><div><strong style="font-size:13px">${data[3]}</strong><p>${data[4]}</p></div></div><div class="sample-row"><div><strong style="font-size:12px">Details collected</strong><p>Context ready for your workflow</p></div></div><div class="sample-row"><div><strong style="font-size:12px">Your team, kept in the loop</strong><p>One conversation. All the context.</p></div></div></div>`;}


const {modal,closeModal}=__modules.ui;
const root=document.getElementById('app');

let stage=0,service='Consultation',slot='10:00 AM',payment='Payment link';
const btn=(label,value)=>`<button class="btn" data-demo="${value}">${label}</button>`;
function drawDemo(){
const states=[
['00:07 · From an Instagram ad','Hi! I saw your Instagram ad. Can I book for tomorrow?','Welcome! I can help with an appointment, a seat booking, or a service. What do you need?',[btn('Consultation','service:Consultation'),btn('Seat booking','service:Seat booking'),btn('Service visit','service:Service visit')].join('')],
['Choose a time',service+' please.','Here are sample available times for tomorrow. Which works for you?',['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','02:00 PM','02:30 PM','03:00 PM','04:00 PM','05:00 PM'].map(t=>btn(t,'slot:'+t)).join('')],
['Review before paying',slot+' works for me.',`Please confirm: ${service} · Tomorrow · ${slot} · ₹1,000. Your slot will be held while payment is pending.`,btn('Confirm booking','confirm')+btn('Choose another time','back')],
['Secure payment', 'Yes, please confirm.', 'Choose a Razorpay payment link or QR. In your connected system, payment status is verified by the server before confirmation.',btn('Show payment link','pay:Payment link')+btn('Show QR option','pay:Payment QR')],
['Payment pending',payment+' selected.',`Sample ${payment.toLowerCase()} · ₹1,000. No real payment is requested. Simulate a verified payment to continue.`,btn('Simulate verified payment','paid')+btn('Simulate failed payment','failed')],
['Booking confirmed','Payment complete.',`Payment verified. Your ${service.toLowerCase()} is booked for tomorrow at ${slot}. Your booking ID is DEMO-001.`,btn('Ask to cancel','cancel')+btn('Try again','reset')],
['Owner approval','I need to cancel my booking.', 'Your cancellation request has been sent to the owner. You can choose a new slot or request a refund under the business policy.',btn('Owner approves cancellation','approve')+btn('Owner declines cancellation','decline')],
['Cancelled by owner','Cancellation approved.', 'Your original slot is released. Would you like to book another time or request a refund?',btn('Reschedule','reschedule')+btn('Request refund','refund')],
['Refund requested','Please refund my payment.', 'The owner has approved a sample refund request. A real refund is processed by Razorpay and confirmed after provider verification; it may take time to reach your account.',btn('Simulate refund processed','refunded')],
['Refund processed','Refund status update.', 'Sample refund verified. Confirmation sent to the customer; the booking row and owner notification are updated.',btn('Start again','reset')]
];
const s=states[stage];
document.getElementById('demo-chat').innerHTML=`<div class="demo-stage">${s[0]}</div><div class="chat-bubble customer">${s[1]}</div><div class="chat-bubble">${s[2]}</div><div class="demo-choices">${s[3]}</div>`;
document.getElementById('owner-demo').innerHTML=stage>=5?`<div class="demo-stage">Owner view · Sample data</div><h3>${stage===6?'Cancellation request':stage>=7?'Booking updated':'New confirmed booking'}</h3><p>A Google Sheet row is created after verified payment. The owner is notified immediately when the connected automation receives the event.</p><div class="sheet-scroll"><table><thead><tr><th>ID</th><th>Customer</th><th>Service</th><th>Time</th><th>Payment</th><th>Status</th></tr></thead><tbody><tr><td>DEMO-001</td><td>Alex</td><td>${service}</td><td>${slot}</td><td>${stage===9?'Refunded':stage===8?'Refund requested':'₹1,000 · Paid'}</td><td>${stage===6?'Cancel requested':stage>=7?'Cancelled':'Confirmed'}</td></tr></tbody></table></div><div class="owner-alert">${stage===6?'Owner receives the cancellation request.':stage>=7?'Customer, Google Sheet, and owner receive the status update.':'Owner notification: Alex booked '+service+' at '+slot+'.'}</div>`:`<div class="demo-stage">Owner view</div><h3>Your business keeps moving.</h3><p>Once payment is verified, a booking is confirmed, added to Google Sheets, and sent to the owner. Pending and failed payments never appear as confirmed bookings.</p><div class="owner-alert">Waiting for a confirmed booking…</div>`;
}
document.addEventListener('click',e=>{
const choice=e.target.closest('[data-demo]');if(choice){const v=choice.dataset.demo;if(v.startsWith('service:')){service=v.slice(8);stage=1;}else if(v.startsWith('slot:')){slot=v.slice(5);stage=2;}else if(v==='back'||v==='reschedule')stage=1;else if(v==='confirm')stage=3;else if(v.startsWith('pay:')){payment=v.slice(4);stage=4;}else if(v==='paid')stage=5;else if(v==='failed'){document.getElementById('demo-chat').insertAdjacentHTML('beforeend','<p role="status">Payment failed. Your booking is still unconfirmed. Choose another payment option and try again.</p>');return;}else if(v==='cancel')stage=6;else if(v==='approve')stage=7;else if(v==='decline'){stage=5;drawDemo();document.getElementById('demo-chat').insertAdjacentHTML('beforeend','<p role="status">Owner declined the request under the sample policy. The original booking stays confirmed. Contact the owner for help.</p>');return;}else if(v==='refund')stage=8;else if(v==='refunded')stage=9;else stage=0;drawDemo();return;}
const b=e.target.closest('[data-action]');const scroll=e.target.closest('[data-scroll]');if(scroll){e.preventDefault();document.getElementById(scroll.dataset.scroll)?.scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth'});document.getElementById('marketing-links')?.classList.remove('mobile-open');document.querySelector('.mobile-toggle')?.setAttribute('aria-expanded','false');return;}if(!b)return;
const a=b.dataset.action;
if(a==='enter-demo'){document.getElementById('customer-demo').scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth'});}
else if(a==='watch-story'){document.getElementById('booking-film').scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth'});loadPoster();document.getElementById('booking-film').play().catch(()=>{});}
else if(a==='toggle-theme'){const next=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('zyro-theme',next)}catch{}setTheme(next);}
else if(a==='marketing-menu'){const open=document.getElementById('marketing-links').classList.toggle('mobile-open');b.setAttribute('aria-expanded',String(open));}
else if(a==='close-modal')closeModal();
else if(a==='solution'){document.querySelectorAll('.solution-tab').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-selected',String(active));});document.getElementById('solution-panel').innerHTML=solution(Number(b.dataset.index));}
else if(a==='book-demo'||a==='website-enquiry')modal('Contact Zyro Flow',`<p>${a==='website-enquiry'?'Ask us for an affordable website quote.':'₹10,000 one-time setup + 10% of each confirmed WhatsApp booking.'}</p><p>Tell us about your business and booking process.</p><div class="demo-choices"><a class="btn primary" href="https://wa.me/918089601107?text=Hi%20Zyro%20Flow%2C%20I%20would%20like%20to%20discuss%20my%20business." target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a><a class="btn" href="mailto:ananthajeethd4@gmail.com">Email us</a></div><p>+91 80896 01107<br>ananthajeethd4@gmail.com</p>`);
else if(a==='privacy')modal('Privacy', '<p>This public demo uses fictional customer data and makes no bookings or payments. The theme preference is stored in your browser. Contacting us through WhatsApp or email uses those services’ privacy policies.</p>');
else if(a==='terms')modal('Terms & copyright','<p>© '+new Date().getFullYear()+' Zyro Flow. All rights reserved.</p><p>This demonstration illustrates the intended customer journey. Provider setup is required for live messaging, payments, Google Sheet updates, and owner notifications. Cancellation eligibility and refund timing follow the business policy and payment provider.</p>');
});
// This public page contains no account forms or workspace routes.
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#/'))history.replaceState(null,'',location.pathname+location.search);});
if(location.hash.startsWith('#/'))history.replaceState(null,'',location.pathname+location.search);

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const colorPreference=matchMedia('(prefers-color-scheme: dark)');
function savedTheme(){try{const t=localStorage.getItem('zyro-theme');return t==='dark'||t==='light'?t:null;}catch{return null;}}
function setTheme(theme){
 document.documentElement.dataset.theme=theme;
 const toggle=document.querySelector('.theme-toggle');
 if(toggle)toggle.textContent=theme==='dark'?'Light mode':'Dark mode';
 toggle?.setAttribute('aria-pressed',String(theme==='dark'));
 toggle?.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' theme');
 toggle?.setAttribute('title','Switch to '+(theme==='dark'?'light':'dark')+' theme');
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#0b111b':'#fffefa');
}
setTheme(savedTheme()??(colorPreference.matches?'dark':'light'));
colorPreference.addEventListener('change',e=>{if(!savedTheme())setTheme(e.matches?'dark':'light');});
window.addEventListener('storage',e=>{if(e.key==='zyro-theme')setTheme(savedTheme()??(colorPreference.matches?'dark':'light'));});
const film=document.getElementById('booking-film');
function loadPoster(){if(film.dataset.poster){film.poster=film.dataset.poster;delete film.dataset.poster;}}
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){loadPoster();observer.disconnect();}},{rootMargin:'0px'});observer.observe(film);}else loadPoster();
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'){document.getElementById('marketing-links').classList.remove('mobile-open');document.querySelector('.mobile-toggle')?.setAttribute('aria-expanded','false');}
 const tab=event.target.closest('.solution-tab');
 if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const buttons=[...document.querySelectorAll('.solution-tab')];const index=event.key==='Home'?0:event.key==='End'?2:(buttons.indexOf(tab)+(event.key==='ArrowRight'?1:2))%3;buttons[index].focus();buttons[index].click();}
});
})();