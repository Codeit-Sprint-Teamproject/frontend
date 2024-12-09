'use client';

import { createContext, useContext, useState } from 'react';

type TabContextType = {
  tab: 'active' | 'completed' | 'created' | 'bookmark';
  setTab: (value: 'active' | 'completed' | 'created' | 'bookmark') => void;
};

export const TabContext = createContext<TabContextType | null>(null);
export default function TabContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<TabContextType['tab']>('active');
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within TabProvider');
  }
  return context;
};
