import React from 'react'
import Header from './components/header'
import Sidebar from './components/sidebar'
import GraphView from './components/graphView'
import { ConfigProvider } from 'antd'

import './assets/App.scss'

function App () {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }} >
      <div className="app">
        <header>
          <Header />
        </header>
        <section className='body'>
          <Sidebar />
          <GraphView />
        </section>
      </div>
    </ConfigProvider>
  )
}

export default App
