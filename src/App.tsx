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
          <ButtonCounter label={Ord.First} />
        </XTab>
        &nbsp;|&nbsp;
        <XTab value={Ord.Second}>
          <ButtonCounter label={Ord.Second} />
        </XTab>
        &nbsp;|&nbsp;
        <XTab value={Ord.Third}>
          <ButtonCounter label={Ord.Third} />
        </XTab>
      </XTabs>
      <br />
      <hr />
      <br />
      <XTabs<Ord> default={Ord.First} beforeTabLabel={(_, isSelected) => <>
        <input type='radio' checked={isSelected} readOnly style={{ cursor: 'inherit' }}/>&nbsp;
      </>}>
        <XTab value={Ord.First}>
          <div className="card">
            <ButtonCounter label={Ord.First} />
          </div>
        </XTab>
        &nbsp;|&nbsp;
        <XTab value={Ord.Second} render={
          <span style={{ color: 'red' }}>{Ord.Second}</span>
        }>
          <div className="card">
            <ButtonCounter label={Ord.Second} />
          </div>
        </XTab>
        &nbsp;|&nbsp;
        <XTab value={Ord.Third} render={(val, isSelected) => <>
          <span style={{ background: isSelected ? 'green' : 'red' }}>{val.toString()}</span>
        </>}>
          <div className="card">
            <ButtonCounter label={Ord.Third} />
          </div>
        </XTab>
      </XTabs>
    </div>
  )
}

export default App
