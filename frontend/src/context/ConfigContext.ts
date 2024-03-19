import { ConfigContextType } from '@/types/Config';
import { createContext } from 'react';

export const ConfigContext = createContext<ConfigContextType | null>(null);
