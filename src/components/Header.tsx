'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Leaf, Menu, X, ArrowUpRight } from 'lucide-react';
import { WhatsAppLink, PhoneLink } from './ContactActions';
import { business } from '@/lib/business';
import { basePath } from '@/lib/paths';

const links = [
  ['/products/', 'Products'],
  ['/bulk-enquiry/', 'Bulk Enquiry'],
  ['/about/', 'About'],
  ['/contact/', 'Contact'],
];

function isActive(pathname: string, href: string) {
  const localPath = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`)) ? pathname.slice(basePath.length) : pathname;
  const current = localPath.replace(/\/+$/, '') || '/';
  const target = href.replace(/\/+$/, '');
  return current === target || current.startsWith(`${target}/`)
    || (target === '/products' && current.startsWith('/categories/'));
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 651px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector<HTMLElement>('a')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function key(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === 'Tab') {
        const elements = [toggle.current!, ...(nav.current?.querySelectorAll<HTMLElement>('a,button:not(:disabled)') ?? [])];
        const first = elements[0];
        const last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    }

    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  return <header className={`header ${scrolled ? 'scrolled' : ''}`}>
    <div className="service-strip">
      <span>{business.openingHoursDisplay}</span>
      <a href={`tel:${business.phoneE164}`}>Call & WhatsApp: {business.phoneDisplay}</a>
      <a className="secondary-service-phone" href={`tel:${business.secondaryPhoneE164}`}>Also call: {business.secondaryPhoneDisplay}</a>
    </div>
    <div className="header-inner">
      <Link className="wordmark" href="/" aria-label="Vegmax home" onClick={() => setOpen(false)}>
        vegmax<span className="logo-leaf"><Leaf size={23} strokeWidth={1.5}/></span><span className="wordmark-dot">.</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([href, label]) => <Link key={href} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined}>{label}</Link>)}
      </nav>
      <div className="header-actions"><PhoneLink/><WhatsAppLink compact/></div>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
        {open ? <X/> : <Menu/>}
      </button>
    </div>
    {open && <nav ref={nav} id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
      <div className="mobile-nav-links">
        {links.map(([href, label]) => <Link key={href} href={href} aria-current={isActive(pathname, href) ? 'page' : undefined} onClick={() => setOpen(false)}>
          {label}<ArrowUpRight size={20}/>
        </Link>)}
      </div>
      <div className="mobile-nav-actions"><WhatsAppLink/><PhoneLink/></div>
    </nav>}
  </header>;
}
