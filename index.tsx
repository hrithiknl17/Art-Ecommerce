
import React from 'react';
import { createRoot } from 'react-dom/client';
import { NavigationProvider } from './contexts/NavigationContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import AppContent from './App';

const App = () => {
  return (
    <NavigationProvider>
      <DataProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </DataProvider>
    </NavigationProvider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
