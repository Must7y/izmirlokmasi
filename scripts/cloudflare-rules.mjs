// Offline configuration generator. Does not read credentials or call Cloudflare.
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const policy = JSON.parse(readFileSync(new URL('../operations/http-response-headers.json', import.meta.url), 'utf8'));

export function buildHeaderRule() {
  return {
    ref: 'hanifi_security_headers_v1',
    description: 'Hanifi Usta - browser security headers',
    expression: '(http.host in {"izmirlokmasi.com" "www.izmirlokmasi.com"} and ssl)',
    action: 'rewrite',
    enabled: true,
    action_parameters: {
      headers: Object.fromEntries(Object.entries({...policy.headers,
        // Five-minute rollout only; no includeSubDomains or preload.
        'Strict-Transport-Security': policy.initial_hsts,
      }).map(([name,value])=>[name.toLowerCase(),{operation:'set',value}])),
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(buildHeaderRule(), null, 2));
}
