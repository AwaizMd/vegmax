import fs from 'node:fs/promises';
import ts from 'typescript';
const source=await fs.readFile('src/lib/business.ts','utf8');
const compiled=ts.transpile(source,{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS});
const module={exports:{}};
new Function('exports','module',compiled)(module.exports,module);
const {business,hasPhone,hasWhatsApp,hasSiteUrl}=module.exports;
const errors=[];
if(!hasPhone)errors.push('Owner-confirmed display/E.164 phone is missing or invalid.');
if(!hasWhatsApp)errors.push('Owner-confirmed WhatsApp digits are missing or invalid.');
if(!hasSiteUrl)errors.push('Set NEXT_PUBLIC_SITE_URL to the confirmed HTTPS site URL.');
if(!business.mapsOwnerConfirmed)errors.push('Map destination has not been owner-confirmed.');
if(errors.length){console.error('Production release blocked:\n'+errors.map(e=>'- '+e).join('\n'));process.exit(1);}
console.log('Release configuration validated.');
