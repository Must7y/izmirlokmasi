import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source = readFileSync(new URL('../public/js/analytics.js', import.meta.url), 'utf8');
function browser({saved = null, hostname = 'izmirlokmasi.com', blocked = false} = {}) {
  const handlers = {}; const buttons = ['granted', 'denied'].map(choice => ({hidden: true, dataset: {analyticsChoice: choice}, addEventListener: (_, fn) => {handlers[choice] = fn;}}));
  const scripts = []; const cookies = []; const status = {}; let reloaded = 0;
  const document = {
    referrer: 'https://example.com/private?email=private@example.com',
    getElementById: () => status, querySelectorAll: () => buttons,
    createElement: () => ({}), head: {appendChild: script => scripts.push(script)},
    addEventListener: (name, fn) => {handlers[name] = fn;},
    set cookie(value) {cookies.push(value);}
  };
  const window = {addEventListener: (name, fn) => {handlers[name] = fn;}};
  const context = {window, document, URL, Date, localStorage: {getItem: () => saved, setItem: (_, value) => {if (blocked) throw Error('blocked'); saved = value;}}, location: {hostname, pathname: '/hayir-lokmasi/', reload: () => {reloaded++;}}};
  vm.runInNewContext(source, context);
  return {window, scripts, handlers, cookies, status, clearStorage: () => {saved = null;}, reloaded: () => reloaded};
}
test('fresh, denied, expired and unavailable storage never load Google', () => {
  for (const saved of [null, 'bad json', JSON.stringify({choice: 'denied', at: Date.now()}), JSON.stringify({choice: 'granted', at: 0})]) {
    const b = browser({saved}); assert.equal(b.scripts.length, 0); assert.equal(b.window['ga-disable-G-REPV5VHRCZ'], true);
  }
});
test('explicit consent loads one exact tag, strips query data and denies ads', () => {
  const b = browser(); b.handlers.granted(); b.handlers.granted();
  assert.equal(b.scripts.length, 1);
  assert.equal(b.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-REPV5VHRCZ');
  const commands = b.window.dataLayer.map(args => Array.from(args));
  const consent = commands.find(args => args[0] === 'consent')[2];
  assert.equal(consent.ad_storage, 'denied'); assert.equal(consent.ad_user_data, 'denied'); assert.equal(consent.ad_personalization, 'denied');
  const config = commands.find(args => args[0] === 'config')[2];
  assert.equal(config.cookie_flags, 'SameSite=Lax;Secure'); assert.equal(config.page_referrer, 'https://example.com'); assert.equal(config.page_location, 'https://izmirlokmasi.com/hayir-lokmasi/');
  assert.equal(config.allow_google_signals, false); assert.equal(config.allow_ad_personalization_signals, false);
});
test('contact events contain only channel; revocation disables events and clears cookies', () => {
  const b = browser(); b.handlers.granted();
  const click = href => b.handlers.click({target: {closest: () => ({getAttribute: () => href})}});
  click('https://wa.me/905306902501?text=Private%20message');
  const event = Array.from(b.window.dataLayer.at(-1));
  assert.equal(event[1], 'contact_click'); assert.equal(event[2].contact_method, 'whatsapp');
  assert.doesNotMatch(JSON.stringify(event), /905306|Private|message|text=/);
  b.handlers.denied(); const length = b.window.dataLayer.length; click('tel:+905306902501');
  assert.equal(b.window.dataLayer.length, length); assert.equal(b.window['ga-disable-G-REPV5VHRCZ'], true); assert.equal(b.reloaded(), 1);
  assert.ok(b.cookies.some(value => value.startsWith('_ga_REPV5VHRCZ=; Max-Age=0')));
});
test('preview domains cannot collect and storage errors do not break explicit consent', () => {
  const preview = browser({hostname: 'localhost'}); preview.handlers.granted(); assert.equal(preview.scripts.length, 0);
  const b = browser({blocked: true}); assert.doesNotThrow(() => b.handlers.granted()); assert.equal(b.scripts.length, 1);
});

test('clearing site storage in another tab revokes an already running measurement', () => {
  const b = browser(); b.handlers.granted(); b.clearStorage(); b.handlers.storage({key: null});
  assert.equal(b.window['ga-disable-G-REPV5VHRCZ'], true); assert.equal(b.reloaded(), 1);
});
