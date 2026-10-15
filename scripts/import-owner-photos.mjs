import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Source photographs remain untouched. The generated WebP files are the website assets.
const inputs = [
  ['red-capsicum',1,'8.38.32 AM (1)'],
  ['yellow-capsicum',1,'8.38.32 AM'],
  ['yellow-zucchini',1,'8.38.33 AM (1)'],
  ['yellow-capsicum-2',1,'8.38.33 AM'],
  ['red-chillies-2',1,'8.38.34 AM (1)'],
  ['red-capsicum-2',1,'8.38.34 AM (2)'],
  ['green-zucchini',1,'8.38.34 AM'],
  ['red-cabbage',1,'8.38.35 AM'],
  ['broccoli-2',1,'8.38.39 AM'],
  ['broccoli',1,'8.38.40 AM (1)'],
  ['thyme',1,'8.38.40 AM (2)'],
  ['broccoli-3',1,'8.38.40 AM'],
  ['red-cabbage-2',1,'8.38.41 AM (1)'],
  ['red-chillies-3',1,'8.38.41 AM'],
  ['cucumber',1,'8.38.31 AM'],
  ['green-jalapeno-2',2,'8.38.41 AM'],
  ['baby-carrot',2,'8.38.42 AM (1)'],
  ['cherry-tomatoes',2,'8.38.42 AM (2)'],
  ['red-chillies',2,'8.38.42 AM'],
  ['rosemary',2,'8.38.43 AM (1)'],
  ['iceberg-lettuce',2,'8.38.43 AM (2)'],
  ['pak-choi',2,'8.38.43 AM (3)'],
  ['pea-eggplant',2,'8.38.43 AM'],
  ['asparagus',2,'8.38.44 AM (1)'],
  ['green-jalapeno',2,'8.38.44 AM (2)'],
  ['pak-choi-2',2,'8.38.44 AM'],
];
const directory=path.resolve('public/images');
await fs.mkdir(directory,{recursive:true});
const sources=[];
for(const [slug,folder,time] of inputs){
  const filename=`WhatsApp Image 2026-10-15 at ${time}.jpeg`;
  const source=path.join('C:/Users/User/Downloads',String(folder),filename);
  let pipeline=sharp(source).rotate();
  // Keep the cabbage photograph only; omit the WhatsApp sender and reply interface.
  if(slug==='red-cabbage-2') pipeline=pipeline.extract({left:0,top:373,width:716,height:854});
  // Keep produce in this alternate photograph; omit the background people.
  if(slug==='red-capsicum-2') pipeline=pipeline.extract({left:0,top:240,width:1599,height:659});
  await pipeline.resize({width:1200,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toFile(path.join(directory,slug+'.webp'));
  sources.push({asset:`/images/${slug}.webp`,source:'Supplied by the website owner in this chat',originalFilename:filename,sourceSet:folder,license:'User-supplied for use on this website',modifications:'Resized and converted to WebP'+(slug==='red-cabbage-2'?'; WhatsApp interface cropped out':slug==='red-capsicum-2'?'; background people cropped out':'')});
}
// Editorial images also come from the supplied photos; no stock imagery remains.
for(const [slug,original] of [['hero','yellow-capsicum-2'],['market','red-capsicum-2']]){
  await fs.copyFile(path.join(directory,original+'.webp'),path.join(directory,slug+'.webp'));
  const entry=sources.find(s=>s.asset===`/images/${original}.webp`);
  sources.push({...entry,asset:`/images/${slug}.webp`});
}
const retained=new Set(sources.map(s=>path.basename(s.asset)));
for(const filename of await fs.readdir(directory)){
  if(filename.endsWith('.webp')&&!retained.has(filename)) await fs.unlink(path.join(directory,filename));
}
await fs.writeFile('public/image-sources.json',JSON.stringify(sources,null,2));
await fs.writeFile('ASSET-SOURCES.md','# Product photography\n\nThe catalogue now uses only the 26 photographs supplied by the owner on 15 October 2026. The previous stock photographs have been removed. Repeat photographs are grouped into galleries for the same product. These images do not establish farm ownership, provenance, stock levels, or ongoing availability.\n\nOriginal source files remain untouched in the two supplied Downloads folders. Website copies have been resized and converted to WebP. The WhatsApp status interface and background people in the alternate capsicum image are cropped out. The hero and bulk enquiry images reuse supplied capsicum photographs.\n\n'+sources.map(s=>`## ${s.asset}\n\nSource set ${s.sourceSet}: ${s.originalFilename}\n\nPermission: ${s.license}\n\nChanges: ${s.modifications}\n`).join('\n')+'\n## Fonts and components\n\nFraunces and Manrope: SIL Open Font License 1.1; licence files in public/fonts/. Animate UI accordion: MIT + Commons Clause; see THIRD-PARTY-LICENSES.md.\n');
console.log(`Imported ${inputs.length} supplied photographs, plus two editorial images.`);
