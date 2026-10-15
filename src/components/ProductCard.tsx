import { assetPath } from '@/lib/paths';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getCategory, type Product } from '@/lib/products';
import { PhoneLink, WhatsAppLink } from './ContactActions';
export function ProductCard({product:p}:{product:Product}){return <article className="product-card"><Link href={`/products/${p.slug}/`} className="product-image" aria-label={`Explore ${p.name}`}><Image src={assetPath(p.image)} alt={p.imageAlt} width={800} height={800} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"/><span className="image-arrow"><ArrowUpRight size={20}/></span></Link><div className="product-body"><p className="product-category">{getCategory(p.category)?.shortName}</p><h3><Link href={`/products/${p.slug}/`}>{p.name}</Link></h3><p className="product-description">{p.description}</p><div className="card-actions"><WhatsAppLink productName={p.name} slug={p.slug} compact/><PhoneLink productName={p.name} compact/></div></div></article>;}
export function ProductGrid({items}:{items:Product[]}){return <div className="product-grid">{items.map(p=><ProductCard key={p.slug} product={p}/>)}</div>;}
