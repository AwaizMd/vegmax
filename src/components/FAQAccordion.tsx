'use client';
import { Plus } from 'lucide-react';
import { business } from '@/lib/business';
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from './animate-ui/accordion';
export const faqs=[
 ['Which English vegetables can I enquire about?','Explore broccoli, green and yellow zucchini, coloured capsicum, baby carrots, and asparagus. Our catalogue also includes cucumber, cherry tomatoes, red cabbage, iceberg lettuce, pak choi, chilli peppers, pea eggplant, thyme, and rosemary. Availability is always subject to confirmation.'],
 ['How do I request current prices?','Use the WhatsApp or phone action on a product page. Share the product, quantity, and your location so Vegmax can advise on current prices and packing.'],
 ['Can I enquire about bulk quantities?','Yes. Restaurants, cafés, caterers, hotels, retailers, and home buyers can use the bulk enquiry builder to prepare a product list. Confirm quantities, packing, and commercial terms directly with Vegmax.'],
 ['How do I check delivery availability?','Share your locality or delivery postcode in your enquiry and ask about available pickup or delivery options. Coverage, timing, and any charges must be confirmed by Vegmax.'],
 ['Where is Vegmax located?','Vegmax is listed at House No. 9-6-35/3, Mano Vikas Nagar, Hasthmathpet, Bowenpally, Hyderabad, Telangana 500011. Use the directions link and confirm visiting arrangements before travelling.'],
 ['How can I ask for a product that is not listed?','Choose “Looking for something else? Add it” in the bulk enquiry builder and enter the product name. Vegmax can confirm whether it is available. Sending an enquiry does not confirm an order.'],
 ['When is Vegmax open?',`Vegmax is open 24 hours a day, seven days a week. Call or WhatsApp ${business.phoneDisplay}, or call ${business.secondaryPhoneDisplay}, to enquire about products and current availability.`],
];
export default function FAQAccordion(){return <><Accordion type="single" collapsible defaultValue="0" className="faq-list">{faqs.map(([q,a],i)=><AccordionItem value={String(i)} key={q} className="faq-item"><AccordionHeader><AccordionTrigger className="faq-trigger">{q}<Plus size={20}/></AccordionTrigger></AccordionHeader><AccordionContent><p className="faq-answer">{a}</p></AccordionContent></AccordionItem>)}</Accordion><noscript><div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></noscript></>;}
