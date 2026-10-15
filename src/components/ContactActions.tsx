import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { business, hasPhone } from '@/lib/business';
import { whatsappUrl, productMessage } from '@/lib/enquiries';
export function WhatsAppLink({productName,slug,quantity,unit,compact=false,message}:{productName?:string;slug?:string;quantity?:string;unit?:string;compact?:boolean;message?:string}){
 const href=whatsappUrl(message || (productName && slug?productMessage(productName,slug,quantity,unit):'Hello Vegmax! I would like to enquire about your products, current availability, and prices.'));
 const label=compact?'WhatsApp enquiry':'Enquire on WhatsApp';const accessible=productName?`Enquire on WhatsApp about ${productName}`:label;
 return href?<a className={`button whatsapp ${compact?'compact':''}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={accessible}><MessageCircle size={17}/>{label}<ArrowUpRight size={16}/></a>:<button className={`button whatsapp ${compact?'compact':''}`} disabled title="WhatsApp contact awaiting owner confirmation" aria-label={`${accessible}; contact pending`}><MessageCircle size={17}/>{label}</button>;
}
export function PhoneLink({productName,compact=false,secondary=false,showNumber=false}:{productName?:string;compact?:boolean;secondary?:boolean;showNumber?:boolean}){
 const number=secondary?business.secondaryPhoneE164:business.phoneE164;
 const display=secondary?business.secondaryPhoneDisplay:business.phoneDisplay;
 const label=showNumber?display:secondary?'Alternate call':compact?'Call to enquire':'Call Vegmax';
 const valid=secondary?/^\+[1-9]\d{7,14}$/.test(number??''):hasPhone;
 const accessible=`Call Vegmax${productName?` to enquire about ${productName}`:''}${secondary?' on the alternate number':''}`;
 return valid?<a className="phone-link" href={`tel:${number}`} title={display??undefined} aria-label={showNumber?`${accessible}: ${display}`:accessible}><Phone size={15}/>{label}</a>:<button className="phone-link" disabled title="Phone contact awaiting owner confirmation"><Phone size={15}/>{label}</button>;
}
export function ContactNumbers(){return <div className="contact-numbers"><div><span>WhatsApp & call</span><PhoneLink showNumber/></div><div><span>Additional call number</span><PhoneLink secondary showNumber/></div></div>;}
export function MobileContactBar(){return <div className="mobile-contact"><PhoneLink/><WhatsAppLink compact/></div>;}
