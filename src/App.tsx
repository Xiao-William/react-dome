import React from 'react';
import RouterGurad from './components/RouterGurad';
import { routes } from './router';


function App() {
  return (
    <RouterGurad routes={routes} />
  );
}

export default App;
