import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import GraphView from './components/graphView';


import './assets/App.scss';



function App() {
  return (
    <div className="app">
        <header>
          <Header />
        </header>
        <section className='body'>
          <Sidebar />
          <GraphView />
        </section>
    </div>
  );
}

export default App;
