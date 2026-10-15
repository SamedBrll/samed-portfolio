import { initBusinessWindow, setupBusiness, trackBusiness } from './business.js';
import './desktop.css';
import './retro.css';
// Portfolio content: existing portfolio and the user's accessible project conversations.
const portfolioProjects = [
 {name:'MRZ / NFC Kimlik Okuma',category:'Donanım · OCR · NFC',color:'blue',symbol:'▣',status:'Prototip · test sürecinde',summary:'Kameradan MRZ okuma ile NFC çip okumasını tek bir kimlik kayıt akışında birleştiren prototip.',problem:'Elle veri girişini azaltmak ve kamera ile çipten gelen bilgileri aynı akışta bir araya getirmek.',features:['Kamera ve Tesseract ile MRZ yakalama','PN532 üzerinden fotoğrafsız BAC, DG1 ve DG11 okuma','Android USB / ADB üzerinden alternatif NFC akışı','OCR ve NFC aşamalarının sürelerini ayrı izleme'],flow:['Kamera','MRZ / OCR','NFC okuma','Kayıt'],stack:['Tesseract OCR','PN532','NFC / BAC','Android','USB / ADB'],note:'Çalışan prototip. Farklı kartlarla güvenilirlik ve uçtan uca saha testleri devam ediyor. Çip verisi okumak, belgenin özgünlüğünün kriptografik doğrulandığı anlamına gelmez.'},
 {name:'Telegram Group Manager',category:'Telegram · Yönetim paneli',color:'blue',symbol:'↗',status:'Portfolyo çalışması',summary:'Telegram gruplarının yönetimini bot akışları ve merkezi panel etrafında bir araya getiren çalışma.',problem:'Birden fazla gruptaki moderasyon, duyuru ve çekiliş işlerini tek yerden yönetmek.',features:['Çoklu grup yönetimi','Moderasyon araçları','Çekiliş akışları','Duyuru ve panel üzerinden kontrol'],flow:['Yönetim paneli','Bot işlemi','Telegram grupları'],stack:['Python','Flask','PTB','JSON'],note:'Proje kapsamı mevcut portfolyodaki bilgilerden hazırlanmıştır. Canlı demo bu portfolyoya henüz eklenmedi.'},
 {name:'Dragon Empire',category:'Oyun · Telegram Mini App',color:'orange',symbol:'✳',status:'Portfolyo çalışması',summary:'Telegram içinde oyun mantığı, kullanıcı oturumu ve ilerleme kaydını birleştiren mini uygulama.',problem:'Oyuncunun Telegram içinden erişebildiği, arka uçla bağlantılı bir oyun deneyimi kurmak.',features:['Mini App arayüzü','Kimlik doğrulama akışı','Oyun mantığı ve ilerleme kaydı','Arka uç API entegrasyonu'],flow:['Telegram','Oturum','Oyun','İlerleme kaydı'],stack:['FastAPI','JavaScript','PostgreSQL','Redis'],note:'Proje kapsamı mevcut portfolyodaki bilgilerden hazırlanmıştır. Oyun ekran görüntüleri ve canlı demo henüz eklenmedi.'},
 {name:'CRM & Kayıt Sistemi',category:'Operasyon · Otomasyon',color:'green',symbol:'≡',status:'Portfolyo çalışması',summary:'Müşteri kayıtları, randevular ve yetkilendirmeyi düzenli bir operasyon akışında buluşturan sistem.',problem:'Kayıt oluşturma, güncelleme ve raporlama işlerini aynı süreçte toplamak.',features:['Kayıt oluşturma, güncelleme ve sorgulama','Randevu iş akışları','Rol ve erişim izinleri','Raporlama süreçleri'],flow:['Kayıt','Randevu','İşlem','Rapor'],stack:['Python','Google Sheets','Otomasyon','Rol yönetimi'],note:'Proje kapsamı mevcut portfolyodaki bilgilerden hazırlanmıştır. Gerçek müşteri kayıtları bu sunumda kullanılmaz.'},
];
function renderProjectList(){const t=document.querySelector('#projects').content;t.querySelector('aside p').innerHTML=portfolioProjects.length+' çalışma<br><small>Projeler & geliştirmeler</small>';const files=t.querySelector('.files');files.querySelectorAll('.file').forEach(x=>x.remove());portfolioProjects.forEach((p,i)=>{const b=document.createElement('button');b.className='file';b.dataset.project=i;b.innerHTML='<span class="file-art '+p.color+'">'+p.symbol+'<small>'+String(i+1).padStart(2,'0')+' / PROJE</small></span><span><strong>'+p.name+'</strong><small>'+p.category+'</small></span><b>↗</b>';files.append(b)})}
function projectArticle(index){const p=portfolioProjects[index],a=document.createElement('article');a.className='article project-detail';a.innerHTML='<div class="eyebrow">PROJE DOSYASI / '+String(index+1).padStart(2,'0')+'</div><div class="project-status">'+p.status+'</div><h2>'+p.name+'</h2><p class="project-summary">'+p.summary+'</p><figure class="project-flow '+p.color+'"><figcaption>AKIŞ ŞEMASI <span>Temsili anlatım</span></figcaption><div>'+p.flow.map((s,i)=>'<span><small>'+String(i+1).padStart(2,'0')+'</small>'+s+'</span>').join('<b>→</b>')+'</div></figure><h3>Çıkış noktası</h3><p>'+p.problem+'</p><h3>Kapsam</h3><ul class="feature-list">'+p.features.map(s=>'<li>'+s+'</li>').join('')+'</ul><h3>Araçlar & bileşenler</h3><div class="tags">'+p.stack.map(s=>'<span>'+s+'</span>').join('')+'</div><div class="project-note"><strong>Çalışmanın durumu</strong><p>'+p.note+'</p></div><div class="case-cta"><button class="primary" data-app="brief">Benzer bir projem var <span>↗</span></button><button class="secondary" data-app="demo">Örnek bot akışını dene</button></div>';return a}
renderProjectList();

const area=document.querySelector('#windows');let topZ=10;const names={welcome:'Başlangıç — readme.txt',projects:'Projeler',about:'Hakkımda — samed.txt',terminal:'Terminal — visitor@samed',contact:'İletişim',services:'Hizmetler',brief:'Yeni proje — birlikte başlayalım',demo:'Örnek Telegram botu'};
function indicators(){document.querySelectorAll('.dock [data-app]').forEach(b=>b.classList.toggle('running',!!document.getElementById('win-'+b.dataset.app)))}
function openApp(id,content){if(id==='brief')trackBusiness('brief_open');if(id==='services')trackBusiness('service_view');if(id.startsWith('project-'))trackBusiness('project_view',{project:names[id]||id});let w=document.getElementById('win-'+id);if(w){w.hidden=false;w.style.zIndex=++topZ;return w}w=document.createElement('section');w.className='window';w.id='win-'+id;w.setAttribute('role','dialog');w.setAttribute('aria-label',names[id]||'Proje detayı');const n=area.children.length;w.style.top=(90+n*22)%190+'px';if(n)w.style.left=Math.min(44+n*3,55)+'%';w.innerHTML='<div class="titlebar"><div class="controls"><button class="close" aria-label="Pencereyi kapat">×</button><button class="min" aria-label="Pencereyi küçült">−</button><button class="max" aria-label="Pencereyi büyüt">+</button></div><span></span><small>↗</small></div><div class="window-content"></div>';w.querySelector('.titlebar>span').textContent=names[id]||'Proje detayları';const body=w.querySelector('.window-content');if(content)body.append(content);else body.append(document.getElementById(id).content.cloneNode(true));area.append(w);initBusinessWindow(id,w,openApp);w.style.zIndex=++topZ;w.addEventListener('pointerdown',()=>w.style.zIndex=++topZ);w.querySelector('.close').onclick=()=>{w.remove();indicators()};w.querySelector('.min').onclick=()=>{w.hidden=true};w.querySelector('.max').onclick=()=>w.classList.toggle('maximized');const bar=w.querySelector('.titlebar');bar.addEventListener('dblclick',e=>{if(!e.target.closest('button'))w.classList.toggle('maximized')});bar.addEventListener('pointerdown',e=>{if(e.target.closest('button')||w.classList.contains('maximized')||innerWidth<=600)return;const rect=w.getBoundingClientRect(),parent=area.parentElement.getBoundingClientRect();const dx=e.clientX-rect.left,dy=e.clientY-rect.top;bar.setPointerCapture(e.pointerId);bar.onpointermove=ev=>{w.style.left=Math.max(0,Math.min(innerWidth-w.offsetWidth,ev.clientX-dx))+'px';w.style.top=Math.max(0,Math.min(innerHeight-180,ev.clientY-dy-parent.top))+'px';w.style.right='auto'};bar.onpointerup=()=>{bar.onpointermove=null;bar.onpointerup=null}});if(id==='terminal'){const form=w.querySelector('form'),input=form.querySelector('input'),out=w.querySelector('.terminal-output');form.onsubmit=e=>{e.preventDefault();const raw=input.value.trim(),cmd=raw.toLowerCase();input.value='';if(!raw)return;if(raw.toLocaleLowerCase('tr-TR').normalize('NFC')==='nisoş'){openNisos();return}if(cmd==='clear'){out.replaceChildren();return}const p=document.createElement('p');let reply={help:'help · about · projects · contact · clear\nBir komut yazarak ilgili pencereyi açabilirsin.',about:'Samed Birelli. Botlar, mini uygulamalar ve otomasyonlar.',projects:'Projeler klasörü açılıyor…',contact:'İletişim penceresi açılıyor…'}[cmd]||'Komut bulunamadı. Kullanılabilir komutlar için help yaz.';p.textContent='visitor@samed:~ $ '+raw+'\n'+reply;out.append(p);if(['about','projects','contact'].includes(cmd))openApp(cmd);p.scrollIntoView({block:'nearest'})}}indicators();return w}
document.addEventListener('click',e=>{const app=e.target.closest('[data-app]');if(app)openApp(app.dataset.app);const file=e.target.closest('[data-project]');if(file){const index=Number(file.dataset.project);names['project-'+index]=portfolioProjects[index].name;openApp('project-'+index,projectArticle(index));}});document.getElementById('brand').onclick=()=>openApp('welcome');document.getElementById('theme').onclick=()=>document.body.classList.toggle('warm');function tick(){document.getElementById('clock').textContent=new Intl.DateTimeFormat('tr-TR',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date())}tick();setInterval(tick,30000);openApp('welcome');

(() => {
  const key = 'samed-os.desktop.v1';
  const travel = document.getElementById('time-travel');
  const notice = document.getElementById('desktop-notice');
  let restoring = true, timer, noticeTimer;
  function tell(message) {
    notice.textContent = message;
    notice.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 4200);
  }
  function updateEra() {
    const retro = document.body.classList.contains('retro');
    travel.textContent = retro ? '2026’ya dön ↗' : '1998’e git ↶';
    travel.setAttribute('aria-pressed', String(retro));
    document.querySelector('.menubar strong').textContent = retro ? 'Samed OS 98' : 'Samed OS';
  }
  function save() {
    if (restoring) return;
    const windows = [...area.children].map(w => ({
      id: w.id.slice(4),
      project: w.id.startsWith('win-project-') ? portfolioProjects[Number(w.id.slice(12))]?.name : undefined,
      left: w.style.left, top: w.style.top, right: w.style.right,
      hidden: w.hidden, maximized: w.classList.contains('maximized'),
      z: Number(w.style.zIndex) || 1
    }));
    try {
      localStorage.setItem(key, JSON.stringify({ version: 1, retro: document.body.classList.contains('retro'), warm: document.body.classList.contains('warm'), windows }));
    } catch { /* The desktop also works when browser storage is unavailable. */ }
  }
  function scheduleSave() { if (!restoring) { clearTimeout(timer); timer = setTimeout(save, 180); } }
  function keepVisible() {
    if (innerWidth <= 600) return;
    for (const w of area.children) {
      if (w.hidden || w.classList.contains('maximized')) continue;
      const r = w.getBoundingClientRect();
      w.style.left = Math.max(0, Math.min(r.left, innerWidth - w.offsetWidth - 12)) + 'px';
      w.style.top = Math.max(0, Math.min(r.top - 42, innerHeight - 200)) + 'px';
      w.style.right = 'auto';
    }
  }
  let previous = null;
  try { previous = JSON.parse(localStorage.getItem(key)); } catch { /* First visit or invalid storage. */ }
  if (previous?.version === 1 && Array.isArray(previous.windows)) {
    document.body.classList.toggle('retro', previous.retro === true);
    document.body.classList.toggle('warm', previous.warm === true);
    area.replaceChildren();
    const seen = new Set();
    for (const state of previous.windows.slice(0, 12)) {
      if (!state || typeof state.id !== 'string') continue;
      let id = state.id, content;
      if (id.startsWith('project-')) {
        const index = portfolioProjects.findIndex(p => p.name === state.project);
        if (index < 0) continue;
        id = 'project-' + index;
        names[id] = portfolioProjects[index].name;
        content = projectArticle(index);
      } else if (!['welcome','about','projects','terminal','contact','services','demo','brief'].includes(id)) continue;
      if (seen.has(id)) continue;
      seen.add(id);
      const w = openApp(id, content);
      for (const attr of ['left','top','right']) {
        if (typeof state[attr] === 'string' && /^(auto|\d+(\.\d+)?(px|%))$/.test(state[attr])) w.style[attr] = state[attr];
      }
      w.hidden = state.hidden === true;
      w.classList.toggle('maximized', state.maximized === true);
      if (Number.isFinite(state.z)) w.style.zIndex = Math.max(1, Math.min(9000, state.z));
    }
    topZ = Math.max(10, ...[...area.children].map(w => Number(w.style.zIndex) || 1));
    // A minimized project is reopened through its file in the Projects window.
    indicators();
    tell('Tekrar hoş geldin. Masaüstün bıraktığın gibi.');
  }
  updateEra();
  keepVisible();
  restoring = false;
  new MutationObserver(scheduleSave).observe(area, { childList:true, attributes:true, subtree:true, attributeFilter:['style','class','hidden'] });
  travel.onclick = () => {
    document.body.classList.toggle('retro');
    updateEra();
    keepVisible();
    save();
    tell(document.body.classList.contains('retro') ? '1998’e hoş geldin. Aynı masaüstü, başka bir zaman.' : '2026’ya döndün. Pencerelerin seninle geldi.');
  };
  document.getElementById('theme').addEventListener('click', save);
  document.getElementById('reset-desktop').onclick = () => {
    restoring = true;
    area.replaceChildren();
    document.body.classList.remove('retro','warm');
    topZ = 10;
    openApp('welcome');
    updateEra();
    keepVisible();
    restoring = false;
    save();
    tell('Masaüstü başlangıç düzenine döndü.');
  };
  addEventListener('resize', () => { keepVisible(); scheduleSave(); });
  addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
  save();
})();


function openNisosAlbum(){
 const existing=document.getElementById('win-nisos-album');if(existing){existing.hidden=false;existing.style.zIndex=++topZ;return}
 const panel=document.createElement('article');panel.className='constellation sky-lock';
 panel.innerHTML='<header class="sky-heading"><span>SADECE İKİMİZE</span><h2>Bizim gökyüzümüz</h2><p>Bazı yıldızları yalnızca biz görebiliriz.</p></header><form class="sky-unlock"><label for="sky-password">Gökyüzünün anahtarı</label><input id="sky-password" type="password" autocomplete="off" required maxlength="256" placeholder="Özel parolanı gir"><button class="primary" type="submit">Yıldızları aç ✧</button><p class="unlock-status" role="status"></p></form><p class="sky-hint">Parola bu cihazda kaydedilmez.<br>Pencereyi kapatınca gökyüzü yeniden kilitlenir.</p>';
 names['nisos-album']='Nisoş ♥ — kilitli gökyüzü';const w=openApp('nisos-album',panel);w.classList.add('sky-window');
 const form=panel.querySelector('form'),input=panel.querySelector('input'),button=form.querySelector('button'),status=form.querySelector('.unlock-status');let urls=[];
 const dispose=()=>{urls.forEach(url=>URL.revokeObjectURL(url));urls=[];input.value=''};
 const observer=new MutationObserver(()=>{if(!w.isConnected){dispose();observer.disconnect()}});observer.observe(area,{childList:true});
 form.onsubmit=async e=>{e.preventDefault();if(button.disabled)return;button.disabled=true;status.textContent='Yıldızlar hazırlanıyor…';let password=input.value;input.value='';
 try{
  if(!crypto.subtle)throw new Error('unsupported');
  const response=await fetch('./private-sky/album.enc.json',{cache:'no-store',credentials:'omit'});if(!response.ok)throw new Error('network');
  const encrypted=await response.json();if(encrypted.version!==1||encrypted.iterations!==600000)throw new Error('network');
  if(!Array.isArray(encrypted.parts)||encrypted.parts.length>12||encrypted.parts.some(p=>!/^part-[0-9]{2}\.txt$/.test(p)))throw new Error('network');
  encrypted.ciphertext=(await Promise.all(encrypted.parts.map(async part=>{const r=await fetch('./private-sky/'+part,{cache:'no-store',credentials:'omit'});if(!r.ok)throw new Error('network');return r.text()}))).join('');
  const bytes=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
  const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey']);password='';
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(encrypted.salt),iterations:encrypted.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
  const raw=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(encrypted.iv)},key,bytes(encrypted.ciphertext));
  const album=JSON.parse(new TextDecoder().decode(raw));if(!Array.isArray(album.photos)||album.photos.length!==4)throw new Error('network');
  if(!w.isConnected)return;
  urls=album.photos.map(photo=>URL.createObjectURL(new Blob([bytes(photo)],{type:'image/jpeg'})));
  showNisosSky(w,urls);const lock=document.createElement('button');lock.className='sky-relock';lock.textContent='Gökyüzünü kilitle ↗';lock.onclick=()=>{dispose();w.remove();indicators();openNisosAlbum()};w.querySelector('.constellation').append(lock);
 }catch(error){password='';if(w.isConnected){status.textContent=error.name==='OperationError'?'Bu anahtar gökyüzünü açmadı. Tekrar dene.':error.message==='unsupported'?'Bu tarayıcı şifreli albümü desteklemiyor. Güncel bir tarayıcıda HTTPS üzerinden aç.':'Albüm yüklenemedi. Bağlantını kontrol edip tekrar dene.';button.disabled=false;input.focus()}}
 };
}

function showNisosSky(w,photoUrls){
 const memories=[
  {title:'En tatlı an',note:'Yanımda sen varken, en sıradan gün bile güzel.',photo:'01',x:18,y:62},
  {title:'Ömrüm',note:'Kalabalığın içinde de, bir aynanın karşısında da… Hep senin yanında.',photo:'02',x:39,y:25},
  {title:'Yan yana',note:'Yol nereye giderse gitsin, yan koltuğumda sen ol.',photo:'03',x:64,y:55},
  {title:'Bir öpücük kadar yakın',note:'Bütün güzel manzaraların içinde en sevdiğim, seninle olanı.',photo:'04',x:83,y:22}
 ];
 const note=document.createElement('article');note.className='constellation';
 note.innerHTML='<header class="sky-heading"><span>SADECE SANA, NİSOŞ</span><h2>Bizim gökyüzümüz</h2><p>Bazı anlar geçer. Bazıları yıldız olur.</p></header><div class="star-map" aria-label="Dört anıdan oluşan takımyıldız"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M18 62 L39 25 L64 55 L83 22"/></svg><div class="sky-dust" aria-hidden="true"></div></div><p class="sky-hint">Bir yıldıza dokun, bir anımıza dön. ✧</p><section class="memory-card" hidden aria-label="Seçilen anı"><div class="memory-toolbar"><span class="memory-count"></span><button class="memory-close" aria-label="Fotoğrafı kapat">Gökyüzüne dön ×</button></div><figure><img alt="" decoding="async"><figcaption><h3></h3><p></p></figcaption></figure><nav class="memory-nav" aria-label="Anılar arasında gezin"><button class="memory-prev" aria-label="Önceki anı">← Önceki</button><span aria-hidden="true">♥</span><button class="memory-next" aria-label="Sonraki anı">Sonraki →</button></nav></section><footer class="sky-footer">Aynı gökyüzünde, iyi ki sen.<span>— Samed ♥</span></footer>';
 const map=note.querySelector('.star-map'),card=note.querySelector('.memory-card'),img=card.querySelector('img');let selected=0;
 const base=typeof window.SAMED_ASSET_BASE==='string'?window.SAMED_ASSET_BASE:'./';
 function select(index,focus=true){selected=(index+memories.length)%memories.length;const m=memories[selected];img.src=photoUrls[selected];img.alt='Birlikte bir anımız — '+m.title;card.querySelector('h3').textContent=m.title;card.querySelector('figcaption p').textContent=m.note;card.querySelector('.memory-count').textContent=String(selected+1).padStart(2,'0')+' / 04';card.hidden=false;map.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));if(focus){card.querySelector('.memory-close').focus({preventScroll:true});card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'})}}
 memories.forEach((m,i)=>{const b=document.createElement('button');b.className='memory-star';b.style.left=m.x+'%';b.style.top=m.y+'%';b.setAttribute('aria-label',m.title+' — fotoğrafı aç');b.setAttribute('aria-pressed','false');b.innerHTML='<span class="star-spark" aria-hidden="true">✦</span><span class="star-title">'+m.title+'</span>';b.onclick=()=>select(i);map.append(b)});
 function close(){card.hidden=true;const buttons=map.querySelectorAll('button');buttons.forEach(b=>b.setAttribute('aria-pressed','false'));buttons[selected].focus()}
 card.querySelector('.memory-close').onclick=close;card.querySelector('.memory-prev').onclick=()=>select(selected-1,false);card.querySelector('.memory-next').onclick=()=>select(selected+1,false);
 card.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}else if(e.key==='ArrowRight'){e.preventDefault();select(selected+1,false)}else if(e.key==='ArrowLeft'){e.preventDefault();select(selected-1,false)}});
 w.querySelector('.window-content').replaceChildren(note);w.querySelector('.titlebar>span').textContent='Nisoş ♥ — bizim gökyüzümüz';
}

function openNisos(){
 const existing=document.getElementById('win-nisos');if(existing){existing.hidden=false;existing.style.zIndex=++topZ;return}
 const note=document.createElement('article');note.className='article love-note';
 note.innerHTML='<div class="eyebrow">SADECE SANA / NİSOŞ</div><div class="love-heart" aria-hidden="true">♥</div><h2>İyi ki sen.</h2><p>Bu bilgisayarda bir sürü proje var.<br>Ama en güzel hikâyem sensin.</p><p class="love-signature">Sana ayırdığım yer hep başka. ♥<br><span>— Samed</span></p><div class="love-secret">Bu küçük köşeyi bulduysan, gülümse.<br>Burası senin.</div><button class="primary sky-entry">Bizim gökyüzümüz ✨</button>';
 note.querySelector('.sky-entry').onclick=openNisosAlbum;
 names.nisos='Nisoş ♥ — özel bir mesaj';openApp('nisos',note);
}

setupBusiness(openApp);
