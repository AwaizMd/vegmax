import type { Metadata } from 'next';
import { business, hasSiteUrl, hasPhone, canIndex } from './business';
export function metadata(title:string,description:string,path='/'):Metadata{
 const url=hasSiteUrl?`${business.siteUrl!.replace(/\/$/,'')}${path}`:undefined;
 return {title,description,alternates:url?{canonical:url}:undefined,robots:canIndex?{index:true,follow:true}:{index:false,follow:false},openGraph:{title,description,type:'website',locale:'en_IN',siteName:'Vegmax',...(url?{url,images:[{url:`${business.siteUrl!.replace(/\/$/,'')}/images/hero.webp`,width:1400,height:1100,alt:'Yellow and green capsicum supplied by Vegmax'}]}:{})}};
}
export function JsonLd({data}:{data:object}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;}
export function LocalBusiness(){return <JsonLd data={{'@context':'https://schema.org','@type':'LocalBusiness',name:business.name,description:'English and exotic vegetable supplier in Bowenpally, Hyderabad.',address:{'@type':'PostalAddress',streetAddress:'House No. 9-6-35/3, Mano Vikas Nagar, Hasthmathpet, Bowenpally',addressLocality:'Hyderabad',addressRegion:'Telangana',postalCode:'500011',addressCountry:'IN'},openingHours:business.openingHours,...(hasPhone?{telephone:business.phoneE164,contactPoint:[{'@type':'ContactPoint',telephone:business.phoneE164,contactType:'sales'},{'@type':'ContactPoint',telephone:business.secondaryPhoneE164,contactType:'sales'}]}:{}),...(hasSiteUrl?{url:business.siteUrl}:{})}}/>;}
