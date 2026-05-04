"use client";

export default function PlaceBakehousePage() {
  const js = `
    const ECARD_URL = "https://www.build2click.in/placebakehouse";
    function showToast(msg) {
      const t = document.getElementById('toast');
      document.getElementById('toast-msg').innerText = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3000);
    }
    function copyToClipboard(text, msg) {
      const el = document.createElement("textarea");
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand("copy"); document.body.removeChild(el);
      showToast(msg);
    }
    function downloadVCard() {
      const v = "BEGIN:VCARD\\nVERSION:3.0\\nFN:Place Bakehouse & Coffee\\nORG:Place Bakehouse\\nTITLE:Specialty Coffee & Bakes\\nTEL;TYPE=WORK,VOICE:+918788711509\\nADR:;;Plot 6, Behind Gogas Pump, Chatrapati Square, New Sneh Nagar;Nagpur;Maharashtra;440015;India\\nURL:https://www.instagram.com/placebakehouse/\\nNOTE:Curated by Ajinkya & Vikram Gandhe (MasterChef India Winners).\\nEND:VCARD";
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([v], {type:'text/vcard'}));
      a.download = 'place_bakehouse.vcf'; document.body.appendChild(a); a.click();
      URL.revokeObjectURL(a.href); showToast("Contact card downloaded!");
    }
    function openShareModal() {
      const m = document.getElementById('shareModal'), mc = document.getElementById('shareModalContent');
      document.getElementById('qrCodeImage').src = "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent(ECARD_URL) + "&color=4A3525&bgcolor=ffffff";
      document.getElementById('whatsappShareBtn').href = "https://wa.me/?text=" + encodeURIComponent("Check out Place Bakehouse & Coffee!\\n" + ECARD_URL);
      m.classList.remove('hidden'); void m.offsetWidth; m.classList.add('opacity-100'); mc.classList.remove('scale-95'); mc.classList.add('scale-100');
    }
    function closeShareModal() {
      const m = document.getElementById('shareModal'), mc = document.getElementById('shareModalContent');
      m.classList.remove('opacity-100'); mc.classList.remove('scale-100'); mc.classList.add('scale-95');
      setTimeout(() => m.classList.add('hidden'), 300);
    }
    function copyCardLink() { copyToClipboard(ECARD_URL, "Link copied to clipboard!"); closeShareModal(); }
    document.getElementById('shareModal').addEventListener('click', function(e){ if(e.target===this) closeShareModal(); });
    const featureData = {
      coffee: { title:"Artisan Coffee", desc:"Freshly brewed perfection", svg:'<svg viewBox="0 0 64 64" class="w-full h-full stroke-coffee-800 fill-none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="animate-steam" d="M22 20 Q 18 10 26 6"/><path class="animate-steam-delay-1" d="M32 20 Q 28 10 36 6"/><path class="animate-steam-delay-2" d="M42 20 Q 38 10 46 6"/><path d="M16 24 H48 V44 Q48 54 32 54 Q16 54 16 44 Z" class="fill-coffee-200"/><path d="M48 30 H54 Q58 30 58 36 Q58 42 54 42 H48"/></svg>' },
      bakes: { title:"Fresh Bakes", desc:"Warm & fluffy buns", svg:'<svg viewBox="0 0 64 64" class="w-full h-full stroke-coffee-800 fill-none animate-gentle-bounce" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 16 C 10 16, 6 36, 12 44 C 18 52, 46 52, 52 44 C 58 36, 54 16, 32 16 Z" class="fill-coffee-400"/><path d="M24 24 C 28 28, 36 28, 40 24" opacity="0.6"/><path d="M20 32 C 28 36, 36 36, 44 32" opacity="0.6"/><path d="M24 40 C 28 44, 36 44, 40 40" opacity="0.6"/></svg>' },
      ambience: { title:"Cozy Ambience", desc:"Your favorite cafe view", svg:'<svg viewBox="0 0 64 64" class="w-full h-full stroke-coffee-800 fill-none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 24 L16 10 H48 L56 24 Z" class="fill-coffee-600"/><path d="M8 24 Q 12 30 16 24 Q 20 30 24 24 Q 28 30 32 24 Q 36 30 40 24 Q 44 30 48 24 Q 52 30 56 24" class="fill-coffee-600"/><rect x="18" y="32" width="28" height="24" class="fill-coffee-100"/><path d="M32 32 V56 M18 44 H46"/></svg>' }
    };
    let fTimer, fHideTimer;
    function showFeatureAnimation(type) {
      clearTimeout(fTimer); clearTimeout(fHideTimer);
      const m = document.getElementById('featureModal'), c = document.getElementById('featureModalContent');
      document.getElementById('featureIconContainer').innerHTML = featureData[type].svg;
      document.getElementById('featureTitle').innerText = featureData[type].title;
      document.getElementById('featureDesc').innerText = featureData[type].desc;
      m.classList.remove('hidden'); void m.offsetWidth; m.classList.add('opacity-100'); c.classList.remove('scale-95'); c.classList.add('scale-100');
      fTimer = setTimeout(closeFeatureAnimation, 3000);
    }
    function closeFeatureAnimation() {
      clearTimeout(fTimer); clearTimeout(fHideTimer);
      const m = document.getElementById('featureModal'), c = document.getElementById('featureModalContent');
      m.classList.remove('opacity-100'); c.classList.remove('scale-100'); c.classList.add('scale-95');
      fHideTimer = setTimeout(() => m.classList.add('hidden'), 300);
    }
  `;

  return (
    <>
      {/* Card */}
      <main className="card-glass w-full max-w-md rounded-3xl overflow-hidden border border-white/50 relative">
        {/* Header */}
        <header className="header-pattern h-36 flex items-center justify-center rounded-t-3xl text-coffee-100 relative">
          <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
            <a href="https://www.build2click.in/card" title="Made by Build2Click" className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md shadow-lg hover:scale-110 active:scale-95 transition-all rounded-md border border-white overflow-hidden group">
              <img src="/logo_b2c.png" alt="Build2Click Logo" className="w-full h-full object-contain group-hover:rotate-6 transition-transform" />
            </a>
            <button onClick={() => { if(typeof window !== 'undefined') (window as any).openShareModal(); }} className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-md border border-white shadow-lg hover:scale-110 active:scale-95 transition-all text-coffee-800">
              <i className="ph-bold ph-share-network text-lg"></i>
            </button>
          </div>
          <div className="absolute top-12 right-6 opacity-10 pointer-events-none"><i className="fa-solid fa-mug-hot text-4xl"></i></div>
          <div className="absolute bottom-3 left-6 opacity-10 pointer-events-none"><i className="fa-solid fa-wheat-awn text-4xl"></i></div>
        </header>

        {/* Profile */}
        <div className="px-6 pb-8 relative z-10">
          {/* Avatar */}
          <div className="avatar-container flex justify-center">
            <div className="h-28 w-28 bg-coffee-50 rounded-full p-2 shadow-lg flex items-center justify-center border-2 border-coffee-200">
              <div className="h-full w-full rounded-full border border-coffee-400 border-dashed flex items-center justify-center bg-coffee-100">
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-[85%] h-[85%] drop-shadow-sm mt-1">
                  <circle cx="60" cy="56" r="52" fill="none" stroke="#D9B48F" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6"/>
                  <path d="M 36 36 Q 30 30, 36 24 T 34 12" fill="none" stroke="#8C6239" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
                  <path d="M 44 38 Q 40 33, 46 27 T 44 17" fill="none" stroke="#8C6239" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                  <path d="M 22 42 L 22 100" fill="none" stroke="#4A3525" strokeWidth="8" strokeLinecap="round"/>
                  <circle cx="40" cy="60" r="18" fill="#4A3525"/>
                  <path d="M 34 48 C 44 50, 46 58, 40 60 C 34 62, 36 70, 46 72" fill="none" stroke="#FDF8F5" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M 66 16 L 66 42" fill="none" stroke="#8C6239" strokeWidth="3.5" strokeLinecap="round"/>
                  <path d="M 66 38 Q 58 34, 60 26" fill="none" stroke="#8C6239" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 66 38 Q 74 34, 72 26" fill="none" stroke="#8C6239" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 66 30 Q 58 26, 60 18" fill="none" stroke="#8C6239" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 66 30 Q 74 26, 72 18" fill="none" stroke="#8C6239" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 66 42 L 66 78" fill="none" stroke="#8C6239" strokeWidth="8" strokeLinecap="round"/>
                  <circle cx="84" cy="60" r="18" fill="#D9B48F"/>
                  <path d="M 84 60 C 84 56, 78 56, 78 60 C 78 66, 90 66, 90 60 C 90 50, 72 50, 72 60 C 72 72, 96 72, 96 60" fill="none" stroke="#4A3525" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mt-2 mb-8">
            <h1 className="font-serif text-3xl font-bold text-coffee-900 mb-1">Place Bakehouse</h1>
            <p className="text-coffee-600 font-medium text-sm tracking-wide uppercase">Specialty Coffee &amp; Bakes</p>
            {/* MasterChef Badge */}
            <div className="relative inline-block mt-3 group/chef outline-none" tabIndex={0}>
              <div className="inline-flex items-center gap-2 bg-coffee-100 text-coffee-800 text-xs px-3 py-1.5 rounded-full border border-coffee-200 shadow-sm hover:bg-white hover:border-coffee-300 hover:shadow-md hover:-translate-y-0.5 group-focus/chef:bg-white group-focus/chef:border-coffee-300 group-focus/chef:shadow-md group-focus/chef:-translate-y-0.5 transition-all cursor-pointer">
                <i className="fa-solid fa-star text-yellow-500 group-hover/chef:scale-125 group-focus/chef:scale-125 transition-transform duration-300"></i>
                <span className="group-hover/chef:text-coffee-900 group-focus/chef:text-coffee-900 font-medium transition-colors">By MasterChef India Winners Ajinkya &amp; Vikram Gandhe</span>
              </div>
              {/* Slide-in card */}
              <div className="absolute top-full left-1/2 mt-3 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-coffee-200 p-4 opacity-0 pointer-events-none -translate-x-[70%] scale-95 group-hover/chef:opacity-100 group-hover/chef:-translate-x-1/2 group-hover/chef:scale-100 group-focus/chef:opacity-100 group-focus/chef:-translate-x-1/2 group-focus/chef:scale-100 transition-all duration-500 ease-out z-50 text-left">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-coffee-200 rotate-45"></div>
                <div className="flex gap-3 items-center relative z-10">
                  <img src="/placebakehouse/winnerpic.png" alt="Ajinkya &amp; Vikram Gandhe" className="winner-slide-in w-14 h-14 rounded-full object-cover border-2 border-coffee-300 shrink-0 shadow-sm" />
                  <div>
                    <h4 className="font-serif font-bold text-coffee-900 text-sm leading-tight">Ajinkya &amp; Vikram Gandhe</h4>
                    <p className="text-[9px] text-yellow-600 font-bold tracking-wider uppercase mb-1 mt-0.5">MasterChef India Winners</p>
                    <p className="text-[10px] leading-snug text-coffee-600">Bringing award-winning culinary mastery to Nagpur with world-class artisanal bakes and specialty coffee.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4 mb-8">
            <a href="https://www.instagram.com/placebakehouse/" target="_blank" className="contact-item flex items-center gap-4 p-3 rounded-2xl hover:bg-coffee-50 transition-colors group cursor-pointer border border-transparent hover:border-coffee-200">
              <div className="icon-circle h-12 w-12 rounded-full bg-coffee-200 text-coffee-800 flex items-center justify-center text-xl shadow-sm"><i className="fa-brands fa-instagram"></i></div>
              <div className="flex-1"><p className="text-xs text-coffee-600 font-medium uppercase tracking-wider mb-0.5">Instagram</p><p className="text-sm font-semibold text-coffee-900">@placebakehouse</p></div>
              <i className="fa-solid fa-chevron-right text-coffee-400 group-hover:text-coffee-800 transition-colors text-sm"></i>
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=Place+Bakehouse+Chatrapati+Square+Nagpur" target="_blank" rel="noopener noreferrer" className="contact-item w-full text-left flex items-center gap-4 p-3 rounded-2xl hover:bg-coffee-50 transition-colors group border border-transparent hover:border-coffee-200">
              <div className="icon-circle h-12 w-12 rounded-full bg-coffee-200 text-coffee-800 flex items-center justify-center text-xl shadow-sm"><i className="fa-solid fa-location-dot"></i></div>
              <div className="flex-1"><p className="text-xs text-coffee-600 font-medium uppercase tracking-wider mb-0.5">Location</p><p className="text-sm font-semibold text-coffee-900 leading-snug">Plot 6, Behind Gogas Pump,<br />Chatrapati Sq, New Sneh Nagar, Nagpur</p></div>
              <i className="fa-solid fa-arrow-up-right-from-square text-coffee-400 group-hover:text-coffee-800 transition-colors text-sm"></i>
            </a>
            {/* Amenities */}
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              <button onMouseEnter={() => (window as any).showFeatureAnimation?.('coffee')} onMouseLeave={() => (window as any).closeFeatureAnimation?.()} onClick={() => (window as any).showFeatureAnimation?.('coffee')} className="text-xs bg-white text-coffee-600 px-3 py-1 rounded-full border border-coffee-200 shadow-sm hover:scale-105 hover:bg-coffee-50 transition-all cursor-pointer"><i className="fa-solid fa-mug-saucer mr-1"></i> Artisan Coffee</button>
              <button onMouseEnter={() => (window as any).showFeatureAnimation?.('bakes')} onMouseLeave={() => (window as any).closeFeatureAnimation?.()} onClick={() => (window as any).showFeatureAnimation?.('bakes')} className="text-xs bg-white text-coffee-600 px-3 py-1 rounded-full border border-coffee-200 shadow-sm hover:scale-105 hover:bg-coffee-50 transition-all cursor-pointer"><i className="fa-solid fa-bread-slice mr-1"></i> Fresh Bakes</button>
              <button onMouseEnter={() => (window as any).showFeatureAnimation?.('ambience')} onMouseLeave={() => (window as any).closeFeatureAnimation?.()} onClick={() => (window as any).showFeatureAnimation?.('ambience')} className="text-xs bg-white text-coffee-600 px-3 py-1 rounded-full border border-coffee-200 shadow-sm hover:scale-105 hover:bg-coffee-50 transition-all cursor-pointer"><i className="fa-solid fa-wifi mr-1"></i> Cozy Ambience</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a href="https://wa.me/918788711509?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Place%20Bakehouse." target="_blank" rel="noopener noreferrer" className="btn-hover-effect flex items-center justify-center gap-2 bg-gradient-to-r from-coffee-800 to-coffee-600 text-coffee-50 py-3.5 px-2 rounded-xl font-medium text-sm border border-coffee-900 shadow-md w-full">
              <i className="fa-solid fa-calendar-check"></i><span className="truncate">Reserve Table</span>
            </a>
            <button onClick={() => (window as any).downloadVCard?.()} className="btn-hover-effect flex items-center justify-center gap-2 bg-coffee-800 text-coffee-50 py-3.5 px-2 rounded-xl font-medium text-sm border border-coffee-900 shadow-md w-full">
              <i className="fa-solid fa-user-plus"></i><span className="truncate">Save Contact</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-center w-full">
            <a href="https://www.build2click.in/card" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group opacity-90 hover:opacity-100 transition-all">
              <div className="border border-coffee-400 w-[22px] h-[22px] flex items-center justify-center bg-transparent animate-pop-box group-hover:bg-coffee-50 transition-colors"><i className="fa-solid fa-heart text-coffee-400 text-[11px]"></i></div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-coffee-600 uppercase mt-0.5 group-hover:text-coffee-800 transition-colors">Crafted By Build2Click.in</span>
            </a>
          </div>
        </div>
        <div className="h-2 w-full bg-gradient-to-r from-coffee-600 via-coffee-800 to-coffee-600"></div>
      </main>

      {/* Share Modal */}
      <div id="shareModal" className="fixed inset-0 bg-coffee-900/60 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300 flex items-center justify-center p-4">
        <div id="shareModalContent" className="bg-coffee-50 rounded-3xl p-6 w-full max-w-xs shadow-2xl transform scale-95 transition-transform duration-300 relative border border-coffee-200">
          <button onClick={() => (window as any).closeShareModal?.()} className="absolute top-4 right-4 text-coffee-400 hover:text-coffee-800 transition-colors h-8 w-8 flex items-center justify-center rounded-full hover:bg-coffee-200"><i className="fa-solid fa-xmark text-xl"></i></button>
          <h3 className="font-serif text-xl font-bold text-coffee-900 text-center mb-1">Share Card</h3>
          <p className="text-xs text-coffee-600 text-center mb-5">Scan or send to friends</p>
          <div className="bg-white p-3 rounded-2xl border border-coffee-200 flex justify-center mb-5 mx-auto w-fit shadow-sm">
            <img id="qrCodeImage" src="" alt="QR Code" className="w-40 h-40 rounded-lg" />
          </div>
          <div className="grid gap-3">
            <button onClick={() => (window as any).copyCardLink?.()} className="flex items-center justify-center gap-2 w-full bg-white text-coffee-800 py-3 px-4 rounded-xl font-medium text-sm border border-coffee-300 shadow-sm hover:bg-coffee-100 transition-colors"><i className="fa-solid fa-link text-coffee-600"></i><span>Copy Link</span></button>
            <a id="whatsappShareBtn" href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 px-4 rounded-xl font-medium text-sm shadow-md hover:bg-[#20bd5a] transition-colors"><i className="fa-brands fa-whatsapp text-lg"></i><span>Share via WhatsApp</span></a>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      <div id="featureModal" className="fixed inset-0 bg-coffee-900/60 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none">
        <div id="featureModalContent" className="bg-coffee-50 rounded-3xl p-8 w-full max-w-[260px] shadow-2xl transform scale-95 transition-transform duration-300 relative border border-coffee-200 flex flex-col items-center text-center">
          <div id="featureIconContainer" className="mb-5 w-28 h-28 flex items-center justify-center drop-shadow-md"></div>
          <h4 id="featureTitle" className="font-serif font-bold text-coffee-900 text-xl mb-1"></h4>
          <p id="featureDesc" className="text-xs text-coffee-600 font-medium"></p>
        </div>
      </div>

      {/* Toast */}
      <div id="toast" className="fixed -bottom-10 left-1/2 transform -translate-x-1/2 bg-coffee-900 text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm z-50 flex items-center gap-2">
        <i className="fa-solid fa-check-circle text-green-400"></i>
        <span id="toast-msg">Copied to clipboard</span>
      </div>

      {/* Inline JS */}
      <script dangerouslySetInnerHTML={{ __html: js }} />
    </>
  );
}
