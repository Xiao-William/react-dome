import React from 'react';
import RouterGurad from './components/RouterGurad';
import { routes } from './router';
import { ThemeProvider } from '@/components/ThemeProvider'
function App() {

  return (
    <ThemeProvider>
      <RouterGurad routes={routes} />
    </ThemeProvider>
  );
}

export default App;
