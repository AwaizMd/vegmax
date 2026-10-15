import { business, hasSiteUrl, hasWhatsApp } from './business';
export function whatsappUrl(message:string){return hasWhatsApp ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(message)}` : null;}
export function productMessage(name:string,slug:string,quantity?:string,unit?:string){
 const parts=[`Hello Vegmax! I found your website and would like to enquire about *${name}*.`, 'Could you please share the current availability, price, minimum order quantity, and available packing options?', 'I would also like to check pickup or delivery options for my location.'];
 if(quantity && Number(quantity)>0) parts.push(`Required quantity: ${quantity} ${unit || 'kg'}`);
 if(hasSiteUrl) parts.push(`Product: ${business.siteUrl!.replace(/\/$/,'')}/products/${slug}/`);
 parts.push('Thank you!');return parts.join('\n\n');
}
export type Requirement={product:string;quantity:string;unit:string};
export function bulkMessage(items:Requirement[],details:Record<string,string>){
 return ['Hello Vegmax! I would like a quotation for the following requirements:',items.map((r,i)=>`${i+1}. ${r.product.trim()}${r.quantity?` — ${r.quantity} ${r.unit}`:''}`).join('\n'),...Object.entries(details).filter(([,v])=>v.trim()).map(([k,v])=>`${k}: ${v.trim()}`),'Please confirm availability, current prices, minimum quantities, and pickup or delivery options.','I found you through your website. Thank you!'].join('\n\n');
}
