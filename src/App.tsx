import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { XTabs } from './components/XTabs/XTabs'
import { XTab } from './components/XTabs/XTab'
import { ButtonCounter } from './components'

enum Ord {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
}

function App() {
  return (
    <div className="App">
      <XTabs<Ord> default={Ord.First}>
        <XTab value={Ord.First}>
          <div className="card">
            <ButtonCounter label={Ord.First} />
          </div>
        </XTab>
        <XTab value={'asd'}>
          <div className="card">
            <ButtonCounter label={Ord.Second} />
          </div>
        </XTab>
        <XTab value={Ord.Third}>
          <div className="card">
            <ButtonCounter label={Ord.Third} />
          </div>
        </XTab>
      </XTabs>
    </div>
  )
}

export default App
