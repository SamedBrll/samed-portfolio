import './business.css';
import { trackBusiness, setupAnalytics } from './measurement.js';
export { trackBusiness };

export function makeBrief(data) {
  const value = key => String(data.get(key) || '').trim();
  return ['Merhaba Samed, bir proje hakkında konuşmak istiyorum.', '',
    'Proje: ' + value('service'), 'Ad / ekip: ' + value('name'),
    'İhtiyaç: ' + value('description'), 'Zamanlama: ' + value('timeline'),
    'Bütçe: ' + value('budget'), '', 'samedbrll.com üzerinden iletişime geçiyorum.'].join('\n');
}

export function initBusinessWindow(id, w, open) {
  if (id === 'brief') {
    const form = w.querySelector('.brief-form');
    const preview = w.querySelector('.brief-preview');
    const result = w.querySelector('.brief-result');
    const telegram = w.querySelector('.brief-telegram');
    const email = w.querySelector('.brief-email');
    let text = '';
    form.addEventListener('input', e => { result.hidden = true; e.target.setCustomValidity?.(''); });
    form.onsubmit = e => {
      e.preventDefault();
      form.elements.name.setCustomValidity(form.elements.name.value.trim() ? '' : 'Lütfen adını veya ekibini yaz.');
      form.elements.description.setCustomValidity(form.elements.description.value.trim().length >= 15 ? '' : 'İhtiyacını en az 15 karakterle anlat.');
      if (!form.reportValidity()) return;
      text = makeBrief(new FormData(form));
      preview.value = text;
      telegram.href = 'https://t.me/samedbrll?text=' + encodeURIComponent(text);
      email.href = 'mailto:subzeroreiz@gmail.com?subject=' + encodeURIComponent('Yeni proje: ' + form.elements.service.value) + '&body=' + encodeURIComponent(text);
      result.hidden = false;
      result.querySelector('h3').focus({preventScroll:true});
      result.scrollIntoView({block:'nearest',behavior:'auto'});
      trackBusiness('brief_prepared', {service:form.elements.service.value});
    };
    w.querySelector('.brief-copy').onclick = async () => {
      const status = w.querySelector('.copy-status');
      try { await navigator.clipboard.writeText(text); status.textContent = 'Kopyalandı. İstediğin kanala yapıştırabilirsin.'; }
      catch { preview.focus(); preview.select(); status.textContent = 'Metin seçildi. Kopyalayıp gönderebilirsin.'; }
    };
    telegram.onclick = () => trackBusiness('contact_click', {channel:'telegram',source:'brief'});
    email.onclick = () => trackBusiness('contact_click', {channel:'email',source:'brief'});
  }
  if (id === 'demo') initDemo(w, open);
}

function initDemo(w, open) {
  const log = w.querySelector('.chat-log'), choices = w.querySelector('.chat-choices'), stateLabel = w.querySelector('.demo-state');
  let category = '', detail = '';
  const message = (text, user=false) => { const p=document.createElement('p');p.className=user?'bubble user':'bubble';p.textContent=text;log.append(p);log.scrollTop=log.scrollHeight; };
  const actions = items => { choices.replaceChildren();items.forEach(([label,fn])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;choices.append(b)}); };
  const start = () => { category='';detail='';log.replaceChildren();stateLabel.textContent='01 / Karşılama';message('Merhaba! Örnek destek botuna hoş geldin. Ne yapmak istersin?');actions([['📦 Sipariş takibi',()=>choose('Sipariş takibi')],['🛠 Teknik destek',()=>choose('Teknik destek')],['↗ Bana böyle bir bot lazım',()=>open('brief')]]); };
  function choose(type) { category=type;message(type,true);stateLabel.textContent='02 / Bilgi toplama';trackBusiness('demo_start',{scenario:type});
    if(type==='Sipariş takibi'){message('Demo siparişini seç. Burada gerçek sipariş veya müşteri verisi yok.');actions([['DEMO-1042',()=>{message('DEMO-1042',true);message('Örnek durum: Paket hazırlanıyor → Kargoya teslim → Teslimat. Bu sipariş şu an “Kargoya teslim” adımında.');detail='DEMO-1042 · teslimat sorusu';confirm()}]]);}
    else {message('Hangi konuda desteğe ihtiyacın var?');actions([['Giriş yapamıyorum',()=>issue('Giriş yapamıyorum')],['Bildirim gelmiyor',()=>issue('Bildirim gelmiyor')]]);}
  }
  function issue(text){detail=text;message(text,true);message('Talebi destek ekibine iletilecek şekilde hazırlayabilirim.');confirm();}
  function confirm(){stateLabel.textContent='03 / Onay';message('Kategori: '+category+'\nKonu: '+detail+'\nÖrnek destek kaydı oluşturalım mı?');actions([['Örnek kaydı oluştur',()=>{message('Onaylıyorum',true);message('DEMO-001 oluşturuldu. Gerçek bir kurulumda bu adım yönetim paneline, e-postaya veya ekip grubuna bağlanabilir.');stateLabel.textContent='04 / Örnek kayıt hazır';trackBusiness('demo_complete',{scenario:category});actions([['Bana da böyle bir bot yap',()=>open('brief')],['Baştan dene',start]]);}],['Geri dön',start]]);}
  w.querySelector('.demo-reset').onclick=start;start();
}

export function setupBusiness(open) {
  setupAnalytics();
  const routes={hizmetler:'services',projeler:'projects',demo:'demo',iletisim:'contact',teklif:'brief'};
  function route(){const app=routes[location.hash.slice(1)];if(app)open(app)}
  addEventListener('hashchange',route);route();
  document.querySelectorAll('.sales-nav a').forEach(a=>a.addEventListener('click',()=>{if(a.hash===location.hash)route()}));
  document.addEventListener('click',e=>{const link=e.target.closest('.contact-links a');if(link){const channel=link.href.startsWith('mailto:')?'email':link.href.includes('linkedin.com')?'linkedin':'telegram';trackBusiness('contact_click',{channel,source:'contact'})}});
}
