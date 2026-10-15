import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MobileContactBar } from '@/components/ContactActions';
import './globals.css';
const manrope = localFont({ src: '../../public/fonts/manrope-latin.woff2', variable: '--font-manrope', weight: '200 800', display: 'swap' });
const fraunces = localFont({ src: [
  { path: '../../public/fonts/fraunces-latin.woff2', weight: '100 900', style: 'normal' },
  { path: '../../public/fonts/fraunces-italic-latin.woff2', weight: '100 900', style: 'italic' },
], variable: '--font-fraunces', display: 'swap' });
export const metadata: Metadata = { title: 'Vegmax | English & Exotic Vegetables in Hyderabad', description: 'Explore English vegetables, exotic produce, salad greens and herbs at Vegmax, Bowenpally, Hyderabad. Enquire for availability and prices.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><MobileContactBar/></body></html>;}
