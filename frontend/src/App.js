import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import GraphView from './components/graphView';
import UploadModule from './components/UploadModule';

import './assets/App.scss';



function App() {
  return (
    <div className="app">
        <header>
          <Header />
        </header>
        <div className='body'>
          <div><Sidebar />
            <div><UploadModule/></div>
          </div>
        </div>
    </div>
  );
}

export default App;
