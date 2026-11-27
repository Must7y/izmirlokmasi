// Only actual response headers count; HTML meta is not an HTTP-header substitute.
export function baselineSecurityHeaderGaps(headers) {
  const gaps = [];
  if (!['DENY', 'SAMEORIGIN'].includes(headers.get('x-frame-options')?.toUpperCase())) gaps.push('Frame protection absent');
  if (headers.get('x-content-type-options')?.toLowerCase() !== 'nosniff') gaps.push('X-Content-Type-Options nosniff absent');
  if (!['same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'no-referrer'].includes(headers.get('referrer-policy'))) gaps.push('Restrictive Referrer-Policy absent');
  const permissions = headers.get('permissions-policy') || '';
  const features = new Map(permissions.split(',').map(entry => entry.trim().split(/\s*=\s*/)));
  if (features.get('camera') !== '()' || features.get('microphone') !== '()') gaps.push('Camera/microphone restriction absent');
  return gaps;
}

export function securityHeaderGaps(headers) {
  const gaps = [];
  const csp = headers.get('content-security-policy') || '';
  const directives = new Map(csp.split(';').map(entry => {
    const [name, ...tokens] = entry.trim().split(/\s+/);
    return [name, tokens];
  }));
  const names = csp.split(';').map(entry=>entry.trim().split(/\s+/)[0]).filter(Boolean);
  const deny = name => directives.get(name)?.length === 1 && directives.get(name)[0] === "'none'";
  if (new Set(names).size !== names.length || !deny('default-src') || !deny('frame-ancestors') || /unsafe-inline|unsafe-eval/i.test(csp)) gaps.push('HTTP CSP with frame-ancestors absent or unsafe');
  const maxAge = /(?:^|;)\s*max-age=(\d+)(?:;|$)/i.exec(headers.get('strict-transport-security') || '');
  if (!maxAge || Number(maxAge[1]) < 15768000) gaps.push('HSTS with at least six months max-age absent');
  if (headers.get('x-frame-options')?.toUpperCase() !== 'DENY') gaps.push('X-Frame-Options DENY absent');
  if (headers.get('x-content-type-options')?.toLowerCase() !== 'nosniff') gaps.push('X-Content-Type-Options nosniff absent');
  if (headers.get('referrer-policy') !== 'strict-origin-when-cross-origin') gaps.push('HTTP Referrer-Policy absent or different');
  for (const gap of baselineSecurityHeaderGaps(headers).filter(gap=>gap === 'Camera/microphone restriction absent')) gaps.push(gap);
  return gaps;
}
