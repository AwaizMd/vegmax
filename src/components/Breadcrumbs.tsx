import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { business,hasSiteUrl } from '@/lib/business';
import { JsonLd } from '@/lib/seo';
export default function Breadcrumbs({items}:{items:{name:string;href:string}[]}){return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item,i)=><span key={item.href}><ChevronRight size={13}/>{i===items.length-1?<span aria-current="page">{item.name}</span>:<Link href={item.href}>{item.name}</Link>}</span>)}</nav>{hasSiteUrl&&<JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',href:'/'},...items].map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:business.siteUrl!.replace(/\/$/,'')+item.href}))}}/>}</>;}
