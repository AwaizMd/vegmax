export type BusinessConfig = { name: string; phoneDisplay: string | null; phoneE164: string | null; secondaryPhoneDisplay: string; secondaryPhoneE164: string; whatsappDigits: string | null; email: string | null; siteUrl: string | null; address: string; mapsUrl: string; mapsOwnerConfirmed: boolean; openingHoursDisplay: string; openingHours: string[] };
export const business: BusinessConfig = {
  name: 'Vegmax', phoneDisplay: '+91 98490 99812', phoneE164: '+919849099812',
  secondaryPhoneDisplay: '+91 90528 72238', secondaryPhoneE164: '+919052872238',
  whatsappDigits: '919849099812', email: null, siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
  openingHoursDisplay: 'Open 24/7', openingHours: ['Mo-Su 00:00-24:00'],
  address: 'House No. 9-6-35/3, Mano Vikas Nagar, Hasthmathpet, Bowenpally, Hyderabad, Telangana 500011, India.',
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJr5z1uWSayzsRP0deZzDZkmg', mapsOwnerConfirmed: false,
};
export const hasPhone = !!business.phoneDisplay && /^\+[1-9]\d{7,14}$/.test(business.phoneE164 ?? '');
export const hasWhatsApp = /^[1-9]\d{7,14}$/.test(business.whatsappDigits ?? '');
export const hasSiteUrl = /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(?::\d+)?(?:\/[a-z0-9_./-]*)?$/i.test(business.siteUrl ?? '');
// Keep the deployed preview out of search results until the supplied Maps listing is checked.
export const canIndex = hasSiteUrl && business.mapsOwnerConfirmed;
