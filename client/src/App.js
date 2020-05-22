import React from 'react';
import { Router } from '@reach/router';
import Main from './views/Main';
import Detail from './views/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/"/>
        <Detail path="projects/new" />
      </Router>
    </div>
  );
}
export default App;
