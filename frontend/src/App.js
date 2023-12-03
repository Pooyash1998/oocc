import React from 'react'
import HeaderComponent from './components/headerComponent'
import Sidebar from './components/sidebar'
import GraphView from './components/graphView'

function App () {
  return (
    <div className="app">
        <HeaderComponent />
      <section>
        <Sidebar/>
        <GraphView/>
      </section>
    </div>
  )
}

export default App
