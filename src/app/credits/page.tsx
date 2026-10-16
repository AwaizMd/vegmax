import { assetPath } from '@/lib/paths';
import sources from '../../../public/image-sources.json';
import { metadata as pageMetadata } from '@/lib/seo';
export const metadata=pageMetadata('Product Photography | Vegmax','Photo sources and licenses for Vegmax product photography and representative catalogue images.','/credits/');
export default function Credits(){return <div className="container page-section prose">
  <p className="eyebrow">OUR PRODUCT PHOTOGRAPHY</p>
  <h1>A closer look at<br/><em>the ingredients.</em></h1>
  <p>The catalogue combines 26 photographs supplied by Vegmax with freely licensed representative photographs from Wikimedia Commons. Repeated owner photographs appear together on the relevant product page. Website copies are optimized as WebP.</p>
  <p>Please enquire directly for current availability, quantities, and packing. Product photographs do not guarantee current stock.</p>
  {sources.filter(s=>!['/images/hero.webp','/images/market.webp'].includes(s.asset)).map(s=><section className="credit-row" key={s.asset}>
    <h2>{s.asset.split('/').at(-1)?.replace('.webp','').replaceAll('-',' ')}</h2>
    <p>{'author' in s ? `Photograph: ${s.author}. License: ${s.license}.` : 'Photograph supplied by Vegmax.'} {s.modifications}.</p>
    {s.source.startsWith('https://')&&<p><a className="text-link" href={s.source} target="_blank" rel="noopener noreferrer">Original photograph and attribution</a>{'licenseUrl' in s&&<> · <a className="text-link" href={s.licenseUrl} target="_blank" rel="noopener noreferrer">License terms</a></>}</p>}
    <a className="text-link" href={assetPath(s.asset)}>View photograph</a>
  </section>)}
</div>;}
