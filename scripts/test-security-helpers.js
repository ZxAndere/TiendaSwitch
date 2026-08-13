// Self-check for the security helpers added in the audit-fix pass.
// Copy of the helper bodies (server.js can't be required without deps).
const crypto = require('crypto');

function sanitizeGameForPublic(game) {
  if (!game || typeof game !== 'object') return game;
  const g = { ...game };
  ['cuentas','siguienteVarianteIndex','soldPrimaria','soldSecundaria','stockPrimaria','stockSecundaria','deletedAt'].forEach(f => delete g[f]);
  return g;
}

function verifyOtpCode(storedCode, providedCode) {
  if (typeof storedCode !== 'string' || typeof providedCode !== 'string') return false;
  const a = Buffer.from(storedCode, 'utf8');
  const b = Buffer.from(providedCode, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function isSafeHttpUrl(url) {
  return typeof url === 'string' && /^https?:\/\/[^\s"'<>]+$/i.test(url.trim());
}

function escapeHtmlEmail(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const assert = (cond, msg) => { if (!cond) { console.error('FAIL:', msg); process.exitCode = 1; } else console.log('ok:', msg); };

// 1. Public sanitizer strips credentials and internals
const g = { id: 1, titulo: 'X', cuentas: ['user/pass/123'], siguienteVarianteIndex: 3, stockPrimaria: 1, soldSecundaria: 9, deletedAt: 'd', visible: true, imagen: 'https://x' };
const clean = sanitizeGameForPublic(g);
assert(clean.cuentas === undefined, 'cuentas stripped');
assert(clean.siguienteVarianteIndex === undefined && clean.stockPrimaria === undefined && clean.soldSecundaria === undefined && clean.deletedAt === undefined, 'internals stripped');
assert(clean.titulo === 'X' && clean.visible === true && clean.imagen === 'https://x', 'public fields kept');
assert(g.cuentas !== undefined, 'original object untouched (copy, not mutate)');

// 2. OTP compare
assert(verifyOtpCode('123456', '123456') === true, 'correct OTP accepted');
assert(verifyOtpCode('123456', '123457') === false, 'wrong OTP rejected');
assert(verifyOtpCode('123456', '12345') === false, 'length mismatch rejected');
assert(verifyOtpCode(null, '123456') === false, 'non-string rejected');

// 3. URL validation blocks attribute breakout / javascript:
assert(isSafeHttpUrl('https://img.nintendo.com/x.jpg') === true, 'https URL ok');
assert(isSafeHttpUrl('http://x.com/a?b=1') === true, 'http URL ok');
assert(isSafeHttpUrl('x" onerror="alert(1)') === false, 'quote breakout rejected');
assert(isSafeHttpUrl('javascript:alert(1)') === false, 'javascript: rejected');
assert(isSafeHttpUrl('https://x.com/a b.jpg') === false, 'space rejected');

// 4. Email escape
assert(escapeHtmlEmail('<script>alert(1)</script>') === '&lt;script&gt;alert(1)&lt;/script&gt;', 'script escaped');
assert(escapeHtmlEmail('a"b') === 'a&quot;b', 'quotes escaped');

// 5. Email regex
assert(EMAIL_RE.test('user@gmail.com') === true, 'valid email ok');
assert(EMAIL_RE.test('x@y') === false, 'no TLD rejected');
assert(EMAIL_RE.test('a b@c.com') === false, 'space rejected');

// 6. Coupon bounds (mirror of admin create validation)
const couponOk = (v, type) => Number.isSafeInteger(v) && v >= 1 && (type !== 'percent' || v <= 100);
assert(couponOk(15, 'percent') === true, 'percent 15 ok');
assert(couponOk(100, 'percent') === true, 'percent 100 ok');
assert(couponOk(101, 'percent') === false, 'percent >100 rejected');
assert(couponOk(5000, 'fixed') === true, 'fixed 5000 ok');
assert(couponOk(-5, 'fixed') === false, 'negative rejected');
assert(couponOk(0, 'fixed') === false, 'zero rejected');

console.log(process.exitCode ? 'TESTS FAILED' : 'ALL TESTS PASSED');
