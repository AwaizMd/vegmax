'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function EditorialMotion(){useEffect(()=>{const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.from('.hero-copy > *',{y:18,opacity:0,duration:.65,stagger:.07,ease:'power2.out',clearProps:'all'});gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{gsap.from(el,{y:24,opacity:.1,duration:.65,clearProps:'all',scrollTrigger:{trigger:el,start:'top 92%',once:true}});});if(window.innerWidth>1000)gsap.to('.hero-photo img',{yPercent:4,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});});return()=>ctx.revert();});return()=>media.revert();},[]);return null;}
