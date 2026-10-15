'use client';
import { createContext, useContext } from 'react';
export function getStrictContext<T>(name:string){const context=createContext<T|null>(null);context.displayName=name;function useStrictContext(){const value=useContext(context);if(value===null)throw new Error(`${name} must be used within its provider`);return value;}return [context.Provider,useStrictContext] as const;}
