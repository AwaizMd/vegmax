import { metadata as pageMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductFilters from '@/components/ProductFilters';
export const metadata=pageMetadata('Vegetables, Fruits & Paneer Catalogue | Vegmax Hyderabad','Browse everyday and exotic vegetables, fruits, salad greens, herbs, chillies, and paneer at Vegmax in Bowenpally. Enquire about availability and pricing.','/products/');
export default function Products(){return <div className="container page-section"><Breadcrumbs items={[{name:'Products',href:'/products/'}]}/><div className="page-heading"><p className="eyebrow">A WORLD OF INGREDIENTS</p><h1>Fresh inspiration.<br/><em>One thoughtful catalogue.</em></h1><p>Find your favourites, try something different, or build your next kitchen list.<br/>Enquire for current availability and pricing.</p></div><ProductFilters/></div>;}
