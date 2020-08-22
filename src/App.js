import React from 'react';
import Header from './components/Header'
import Grid from './components/Grid'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Grid N={8} />
    </div>
  );
}

export default App;
