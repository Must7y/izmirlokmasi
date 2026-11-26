/* Optional GA4. No Google request is made before an explicit visitor choice. */
(function () {
  'use strict';
  const id = 'G-REPV5VHRCZ';
  const key = 'hanifi-analytics-v1';
  const lifetime = 90 * 24 * 60 * 60 * 1000;
  const status = document.getElementById('analytics-status');
  const read = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return saved && Date.now() - saved.at < lifetime && saved.choice === 'granted';
    } catch { return false; }
  };
  const clearCookies = () => {
    for (const name of ['_ga', '_ga_REPV5VHRCZ']) {
      for (const domain of ['', '; Domain=izmirlokmasi.com', '; Domain=.izmirlokmasi.com']) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure' + domain;
      }
    }
  };
  const show = (enabled) => {
    if (status) status.textContent = enabled ? 'Ziyaret istatistiği açık.' : 'Ziyaret istatistiği kapalı.';
  };
  let started = false;
  const start = () => {
    if (started || !['izmirlokmasi.com', 'www.izmirlokmasi.com'].includes(location.hostname)) return;
    started = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* No usable referrer. */ }
    window.gtag('config', id, {
      allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: lifetime / 1000, cookie_update: false, cookie_flags: 'SameSite=Lax;Secure',
      page_location: 'https://izmirlokmasi.com' + location.pathname,
      page_referrer: referrer
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-REPV5VHRCZ';
    document.head.appendChild(script);
  };
  const enabled = read();
  window['ga-disable-' + id] = !enabled;
  show(enabled);
  if (enabled) start(); else clearCookies();
  document.querySelectorAll('[data-analytics-choice]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const granted = button.dataset.analyticsChoice === 'granted';
      try { localStorage.setItem(key, JSON.stringify({ choice: granted ? 'granted' : 'denied', at: Date.now() })); } catch { /* Session choice still works when storage is blocked. */ }
      show(granted);
      if (granted) start();
      else {
        window['ga-disable-' + id] = true;
        clearCookies();
        if (started) location.reload();
      }
    });
  });
  window.addEventListener('storage', (event) => {
    if ((event.key === key || event.key === null) && !read()) { window['ga-disable-' + id] = true; clearCookies(); location.reload(); }
  });
  document.addEventListener('click', (event) => {
    if (!started || window['ga-disable-' + id]) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    const method = href.startsWith('https://wa.me/905306902501?') ? 'whatsapp' : href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : null;
    if (method) window.gtag('event', 'contact_click', { contact_method: method, transport_type: 'beacon' });
  });
})();
