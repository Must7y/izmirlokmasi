// Only actual response headers count; HTML meta is not an HTTP-header substitute.
export function securityHeaderGaps(headers) {
  const gaps = [];
  const csp = headers.get('content-security-policy') || '';
  if (!csp.includes("default-src 'none'") || !csp.includes("frame-ancestors 'none'") || /unsafe-inline|unsafe-eval/.test(csp)) gaps.push('HTTP CSP with frame-ancestors absent or unsafe');
  const maxAge = /(?:^|;)\s*max-age=(\d+)(?:;|$)/i.exec(headers.get('strict-transport-security') || '');
  if (!maxAge || Number(maxAge[1]) < 15768000) gaps.push('HSTS with at least six months max-age absent');
  if (headers.get('x-frame-options')?.toUpperCase() !== 'DENY') gaps.push('X-Frame-Options DENY absent');
  if (headers.get('x-content-type-options')?.toLowerCase() !== 'nosniff') gaps.push('X-Content-Type-Options nosniff absent');
  if (headers.get('referrer-policy') !== 'strict-origin-when-cross-origin') gaps.push('HTTP Referrer-Policy absent or different');
  return gaps;
}
