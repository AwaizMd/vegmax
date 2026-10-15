import { notFound } from 'next/navigation';
import { categories,products,getCategory } from '@/lib/products';
import { metadata as pageMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProductGrid } from '@/components/ProductCard';
export function generateStaticParams(){return categories.map(c=>({slug:c.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=getCategory(slug);return c?pageMetadata(`${c.name} in Hyderabad | Vegmax`,c.description,`/categories/${c.slug}/`):{};}
export default async function Category({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=getCategory(slug);if(!c)notFound();return <div className="container page-section"><Breadcrumbs items={[{name:'Products',href:'/products/'},{name:c.name,href:`/categories/${c.slug}/`}]}/><div className="page-heading category-page-heading"><p className="eyebrow">THE VEGMAX RANGE</p><h1>{c.name}<em> in Hyderabad.</em></h1><p>{c.description}</p><p className="fine-print">Enquire for current availability and pricing.</p></div><ProductGrid items={products.filter(p=>p.category===c.slug)}/></div>;}
