import { assetPath } from '@/lib/paths';
import Image from 'next/image';
import type { Product } from '@/lib/products';

export default function ProductGallery({product}:{product:Product}){
 const images=[{src:product.image,alt:product.imageAlt},...product.gallery];
 return <div className="product-gallery">
   {images.map((image,index)=><figure key={image.src} className={index===0?'gallery-main':'gallery-alternate'}>
     <Image className="detail-photo" src={assetPath(image.src)} alt={image.alt} width={900} height={1200} priority={index===0} sizes="(max-width:800px) 90vw, 45vw"/>
     {index>0&&<figcaption>{image.alt}</figcaption>}
   </figure>)}
   <p className="photo-note">{product.imageNote}</p>
 </div>;
}
