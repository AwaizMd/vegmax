import type { MetadataRoute } from 'next';
import {business,canIndex} from '@/lib/business';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',...(canIndex?{allow:'/'}:{disallow:'/'})},...(canIndex?{sitemap:business.siteUrl!.replace(/\/$/,'')+'/sitemap.xml'}:{})};}
