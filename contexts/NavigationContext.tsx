
import React, { createContext, useContext, useState, ReactNode } from 'react';

type NavContextType = {
  view: string;
  setView: (view: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const NavigationContext = createContext<NavContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children?: ReactNode }) => {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on view change
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [view]);

  return (
    <NavigationContext.Provider value={{ view, setView, isMenuOpen, setIsMenuOpen, searchQuery, setSearchQuery }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
};