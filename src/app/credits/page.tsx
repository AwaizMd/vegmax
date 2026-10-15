import { assetPath } from '@/lib/paths';
import sources from '../../../public/image-sources.json';
import { metadata as pageMetadata } from '@/lib/seo';
export const metadata=pageMetadata('Product Photography | Vegmax','Vegetable and herb photographs supplied by Vegmax for its product catalogue.','/credits/');
export default function Credits(){return <div className="container page-section prose">
  <p className="eyebrow">OUR PRODUCT PHOTOGRAPHY</p>
  <h1>A closer look at<br/><em>the ingredients.</em></h1>
  <p>This catalogue uses the 26 photographs supplied by Vegmax. Repeated photographs of the same product appear together on its product page. Website copies are optimized as WebP, and the WhatsApp interface has been removed from the cabbage photograph.</p>
  <p>Please enquire directly for current availability, quantities, and packing. Product photographs do not guarantee current stock.</p>
  {sources.filter(s=>!['/images/hero.webp','/images/market.webp'].includes(s.asset)).map(s=><section className="credit-row" key={s.asset}>
    <h2>{s.asset.split('/').at(-1)?.replace('.webp','').replaceAll('-',' ')}</h2>
    <p>Photograph supplied by Vegmax. {s.modifications}.</p>
    <a className="text-link" href={assetPath(s.asset)}>View photograph</a>
  </section>)}
</div>;}
