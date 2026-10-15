import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
import sharp from 'sharp';
const basePath=(process.env.NEXT_PUBLIC_BASE_PATH||'').replace(/\/$/,'');
function exportedPath(url){
  assert(!basePath || url===basePath || url.startsWith(basePath+'/'),`Missing deployment prefix: ${url}`);
  const local=decodeURIComponent(basePath?url.slice(basePath.length):url);
  return path.join('out',local.endsWith('/')?local+'index.html':local||'index.html');
}
// Transpile isolated pure modules in memory so message tests exercise the shipped implementation.
const configuration=await fs.readFile('src/lib/business.ts','utf8');
const configJs=ts.transpile(configuration,{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS});
const businessModule={exports:{}};new Function('exports','module',configJs)(businessModule.exports,businessModule);
const enquiries=ts.transpile(await fs.readFile('src/lib/enquiries.ts','utf8'),{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS});
function loadEnquiries(config){const m={exports:{}};new Function('exports','module','require',enquiries)(m.exports,m,()=>config);return m.exports;}
const pending=loadEnquiries({...businessModule.exports,hasWhatsApp:false,hasSiteUrl:false});assert.equal(pending.whatsappUrl('Hello'),null);assert(!pending.productMessage('Broccoli','broccoli').includes('undefined'));
const confirmed=loadEnquiries({...businessModule.exports,business:{siteUrl:'https://example.test',whatsappDigits:'919999999999'},hasWhatsApp:true,hasSiteUrl:true});
const msg=confirmed.productMessage('Pak choi / bok choy','pak-choi','2.5','kg');assert(msg.includes('*Pak choi / bok choy*'));assert(msg.includes('Required quantity: 2.5 kg'));assert(msg.includes('Product: https://example.test/products/pak-choi/'));assert.equal(decodeURIComponent(confirmed.whatsappUrl(msg).split('?text=')[1]),msg);assert(!confirmed.productMessage('Broccoli','broccoli').includes('Required quantity'));
const bulk=confirmed.bulkMessage([{product:'Broccoli',quantity:'3',unit:'kg'},{product:'Other herb',quantity:'',unit:'kg'}],{Name:'',Locality:'Bowenpally',Notes:'No plastic & please confirm'});assert(bulk.includes('1. Broccoli — 3 kg'));assert(bulk.includes('2. Other herb'));assert(!bulk.includes('Name:'));assert(bulk.includes('Locality: Bowenpally'));assert.equal(decodeURIComponent(confirmed.whatsappUrl(bulk).split('?text=')[1]),bulk);
const dataJs=ts.transpile(await fs.readFile('src/lib/products.ts','utf8'),{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS});const data={exports:{}};new Function('exports','module',dataJs)(data.exports,data);const {products,categories}=data.exports;
assert.equal(products.length,17);assert.equal(categories.length,4);assert.equal(new Set(products.map(p=>p.slug)).size,17);
const sourceData=JSON.parse(await fs.readFile('public/image-sources.json','utf8'));
const hashes=new Set();const crypto=await import('node:crypto');let imageCount=0;
for(const p of products){for(const image of [{src:p.image},...p.gallery]){const img=await fs.readFile('public'+image.src);const m=await sharp(img).metadata();assert.equal(m.format,'webp');assert(m.width>0&&m.height>0);assert(sourceData.some(s=>s.asset===image.src&&s.license==='User-supplied for use on this website'),'Missing supplied-photo record '+image.src);const hash=crypto.createHash('sha256').update(img).digest('hex');assert(!hashes.has(hash),'Duplicate catalogue photo '+image.src);hashes.add(hash);imageCount++;}for(const related of p.relatedProductSlugs)assert(products.some(x=>x.slug===related));}
assert.equal(imageCount,26,'Every supplied photograph must appear in a product or its gallery');
assert.equal(businessModule.exports.business.phoneE164,'+919849099812');assert.equal(businessModule.exports.business.whatsappDigits,'919849099812');assert.equal(businessModule.exports.business.secondaryPhoneE164,'+919052872238');
const routes=['/','/products/','/bulk-enquiry/','/about/','/contact/','/privacy/','/credits/',...products.map(p=>`/products/${p.slug}/`),...categories.map(c=>`/categories/${c.slug}/`)];
const titles=new Set();let links=0;for(const route of routes){const html=await fs.readFile(path.join('out',route,'index.html'),'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`H1 ${route}`);assert(html.includes('name="description"'),`Description ${route}`);const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert(title&&!titles.has(title),`Title ${route}`);titles.add(title);if(!businessModule.exports.hasPhone)assert(!html.includes('href="tel:'),'Pending phone generated links');if(!businessModule.exports.hasWhatsApp)assert(!html.includes('href="https://wa.me/'),'Pending WhatsApp generated links');for(const [,url] of html.matchAll(/href="([^"#?]+)"/g)){if(url.startsWith('/')&&!url.startsWith('//')){await fs.access(exportedPath(url));links++;}}for(const [,url] of html.matchAll(/src="([^"?]+)"/g)){if(url.startsWith('/')&&!url.startsWith('//'))await fs.access(exportedPath(url));}}
await fs.access('out/404.html');assert((await fs.readFile('out/robots.txt','utf8')).includes(businessModule.exports.canIndex?'Allow: /':'Disallow: /'));await fs.access('out/sitemap.xml');for(const font of ['manrope-latin.woff2','fraunces-latin.woff2','fraunces-italic-latin.woff2'])await fs.access('out/fonts/'+font);
const home=await fs.readFile('out/index.html','utf8');assert(home.includes('Open 24/7'));assert(home.includes('href="tel:+919849099812"'));assert(home.includes('href="tel:+919052872238"'));assert(home.includes('https://wa.me/919849099812?text='));assert(!home.includes('awaiting owner confirmation'));assert(home.includes('Mo-Su 00:00-24:00'));
for(const p of products){const html=await fs.readFile(`out/products/${p.slug}/index.html`,'utf8');for(const image of p.gallery)assert(html.includes(image.src),'Missing gallery photo '+image.src);const urls=[...html.matchAll(/href="(https:\/\/wa.me\/[^\"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&'));assert(urls.some(url=>decodeURIComponent(url).includes(`*${p.name}*`)),`Wrong product enquiry ${p.name}`);}
for(const slug of ['button-mushrooms','avocado','frozen-paneer','baby-corn','basil']){await assert.rejects(fs.access(`out/products/${slug}/index.html`));await assert.rejects(fs.access(`out/images/${slug}.webp`));}
console.log(`PASS: ${routes.length} public routes; ${products.length} products with all ${imageCount} supplied photos; ${links} internal links; metadata; static 404; primary/secondary call links; WhatsApp; 24/7 hours; removed stock routes and assets.`);
console.log('PASS: WhatsApp encoding, per-product name and absolute URL, optional quantity, bulk details and missing-contact behavior.');
