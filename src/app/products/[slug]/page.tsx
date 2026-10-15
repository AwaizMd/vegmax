import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { products,getProduct,getCategory } from '@/lib/products';
import { metadata as pageMetadata,JsonLd } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductEnquiry from '@/components/ProductEnquiry';
import ProductGallery from '@/components/ProductGallery';
import { ProductGrid } from '@/components/ProductCard';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getProduct(slug);return p?pageMetadata(`${p.name} in Hyderabad | Vegmax`,`${p.description} Enquire at Vegmax, Bowenpally, Hyderabad for availability and pricing.`,`/products/${p.slug}/`):{};}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getProduct(slug);if(!p)notFound();const c=getCategory(p.category)!;return <div className="container page-section"><Breadcrumbs items={[{name:'Products',href:'/products/'},{name:c.shortName,href:`/categories/${c.slug}/`},{name:p.name,href:`/products/${p.slug}/`}]}/><div className="product-detail"><ProductGallery product={p}/><div className="detail-copy"><Link className="eyebrow" href={`/categories/${c.slug}/`}>{c.name} <ArrowUpRight size={14}/></Link><h1>{p.name}<span className="serif-dot">.</span></h1><p className="large-copy">{p.description}</p><div className="culinary-uses"><h2>A little kitchen inspiration</h2><ul>{p.culinaryUses.map(use=><li key={use}><Check size={16}/>{use}</li>)}</ul></div><ProductEnquiry name={p.name} slug={p.slug}/></div></div><section className="section related-section"><div className="section-heading"><div><p className="eyebrow">KEEP THE INSPIRATION GOING</p><h2>Good company<br/><em>for your kitchen.</em></h2></div><Link href="/products/" className="text-link">All products <ArrowUpRight size={18}/></Link></div><ProductGrid items={products.filter(x=>p.relatedProductSlugs.includes(x.slug))}/></section><JsonLd data={{'@context':'https://schema.org','@type':'Product',name:p.name,description:p.description,category:c.name}}/></div>;}
