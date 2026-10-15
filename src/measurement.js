// Add the owner's GA4 measurement ID only after the property is created.
export const measurementId = '';
let enabled=false;
const events=new Set(['service_view','project_view','demo_start','demo_complete','brief_open','brief_prepared','contact_click']);
export function trackBusiness(name, params={}) {
  if(!enabled||!events.has(name))return;
  // Never send form text, names, contact details, passwords or album interactions.
  const safe={};for(const key of ['service','channel','source','scenario','project'])if(typeof params[key]==='string')safe[key]=params[key].slice(0,80);
  window.gtag('event',name,safe);
}
export function setupAnalytics(){
  if(!/^G-[A-Z0-9]+$/.test(measurementId))return;
  const key='samed.analytics.consent';
  function enable(){if(enabled)return;enabled=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',measurementId,{send_page_view:true,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_referrer:document.referrer?new URL(document.referrer).origin:''});const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(measurementId);document.head.append(script)}
  let saved;try{saved=localStorage.getItem(key)}catch{}
  if(saved==='yes'){enable();return}if(saved==='no')return;
  const box=document.createElement('aside');box.className='analytics-choice';box.setAttribute('aria-label','İsteğe bağlı ölçüm');box.innerHTML='<p>Siteyi geliştirmek için sayfa ve düğme kullanımını Google Analytics ile ölçmemize izin verir misin? Form içeriği ve özel albüm ölçülmez.</p><button data-choice="yes">İzin ver</button><button data-choice="no">Şimdi değil</button>';box.onclick=e=>{const b=e.target.closest('[data-choice]');if(!b)return;try{localStorage.setItem(key,b.dataset.choice)}catch{}if(b.dataset.choice==='yes')enable();box.remove()};document.body.append(box);
}
