// Verify every HotPepper Beauty / relax-job link in index.html:
// fetch each URL and print its <title> so mismatched salon links stand out.
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const urls = [...new Set(html.match(/https:\/\/(?:beauty\.hotpepper\.jp|relax-job\.com)[^"']+/g))];

const results = [];
for (const url of urls) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      redirect: 'follow',
    });
    const body = await res.text();
    const m = body.match(/<title>([^<]*)<\/title>/);
    results.push(`${res.status} | ${url} | ${m ? m[1].trim().slice(0, 60) : '(no title)'}`);
  } catch (e) {
    results.push(`ERR | ${url} | ${e.message}`);
  }
  await new Promise(r => setTimeout(r, 300)); // be polite
}
console.log(results.join('\n'));
