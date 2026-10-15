import type { MetadataRoute } from 'next';
import { business,canIndex } from '@/lib/business';
import { products,categories } from '@/lib/products';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{if(!canIndex)return [];const paths=['/','/products/','/bulk-enquiry/','/about/','/contact/','/privacy/',...products.map(p=>`/products/${p.slug}/`),...categories.map(c=>`/categories/${c.slug}/`)];return paths.map(path=>({url:business.siteUrl!.replace(/\/$/,'')+path}));}
