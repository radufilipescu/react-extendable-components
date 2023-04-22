import './App.css'
import { XTabs, IXTabsProps, IXTabsDefaultProps, ContentPlaceholder } from './components/XTabs/XTabs'
import { XTab } from './components/XTabs/XTab'
import { ButtonCounter } from './components'

enum Ordered {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
}

XTabs.defaultProps = {
  beforeTabLabel(value, isSelected) {
    return <span>{isSelected ? '✅' : '❌'}</span>;
  },
}

const XOrderedTabs = XTabs<Ordered>;
XOrderedTabs.defaultProps = {
  beforeTabLabel: (val, isSelected) => <span>{isSelected ? '✌' : '✊'}</span>,
} as IXTabsDefaultProps<Ordered>;

const XOrderedTab = XTab<Ordered>;

const OrderedTabs = function() {
  return <XOrderedTabs contentPlaceholder={ContentPlaceholder.BeforeTabs} default={Ordered.First} beforeTabLabel={(_, isSelected) => <>
    <input type='radio' checked={isSelected} readOnly style={{ cursor: 'inherit' }}/>&nbsp;
  </>}>
    <XOrderedTab value={Ordered.First}>
      <div className="card">
        <ButtonCounter label={Ordered.First} />
      </div>
    </XOrderedTab>
    &nbsp;|&nbsp;
    <XOrderedTab value={Ordered.Second} render={
      <span style={{ color: 'red' }}>{Ordered.Second}</span>
    }>
      <div className="card">
        <ButtonCounter label={Ordered.Second} />
      </div>
    </XOrderedTab>
    &nbsp;|&nbsp;
    <XOrderedTab value={Ordered.Third} render={(val, isSelected) => <>
      <span style={{ background: isSelected ? 'green' : 'red' }}>{val.toString()}</span>
    </>}>
      <div className="card">
        <ButtonCounter label={Ordered.Third} />
      </div>
    </XOrderedTab>
  </XOrderedTabs>
}

function App() {
  return (
    <div className="App">
      <hr />
      {"1. <XTabs default='First'>"}
      <hr/>
      <br />
      <XTabs default='First'>
        <XTab value='First'>
          <ButtonCounter label='First' />
        </XTab>
        &nbsp;|&nbsp;
        <XTab value="I-AM-NOT-RESTRICTED">
          <ButtonCounter label='Second' />
        </XTab>
        &nbsp;|&nbsp;
        <XTab value='Third'>
          <ButtonCounter label='Third' />
        </XTab>
      </XTabs>
      <br />
      <hr />
      {"2. <XOrderedTabs default={Ordered.First}>"}
      <hr/>
      <br />
      <XOrderedTabs default={Ordered.First}>
        <XOrderedTab value={Ordered.First}>
          <ButtonCounter label={Ordered.First} />
        </XOrderedTab>
        {/* &nbsp;|&nbsp; */}
        {/* Type '"I-AM-NOT-RESTRICTED"' is not assignable to type 'Ordered'. */}
        {/* <OrdTab value="I-AM-NOT-RESTRICTED">
          <ButtonCounter label={Ord.Second} />
        </OrdTab> */}
        &nbsp;|&nbsp;
        <XOrderedTab value={Ordered.Second}>
          <ButtonCounter label={Ordered.Second} />
        </XOrderedTab>
        &nbsp;|&nbsp;
        <XOrderedTab value={Ordered.Third}>
          <ButtonCounter label={Ordered.Third} />
        </XOrderedTab>
      </XOrderedTabs>
      <br />
      <hr />
      {"3. <XTabs<Ordered> default={Ordered.First} beforeTabLabel={(_, isSelected) => <> ... </>}>"}
      <hr/>
      <br />
      <XTabs<Ordered> default={Ordered.First} beforeTabLabel={(_, isSelected) => <>
        <input type='radio' checked={isSelected} readOnly style={{ cursor: 'inherit' }}/>&nbsp;
      </>}>
        <XTab value={Ordered.First}>
          <div className="card">
            <ButtonCounter label={Ordered.First} />
          </div>
        </XTab>
        &nbsp;|&nbsp;
        <XTab value={Ordered.Second} render={
          <span style={{ color: 'red' }}>{Ordered.Second}</span>
        }>
          <div className="card">
            <ButtonCounter label={Ordered.Second} />
          </div>
        </XTab>
        &nbsp;|&nbsp;
        <XTab value={Ordered.Third} render={(val, isSelected) => <>
          <span style={{ background: isSelected ? 'green' : 'red' }}>{val.toString()}</span>
        </>}>
          <div className="card">
            <ButtonCounter label={Ordered.Third} />
          </div>
        </XTab>
      </XTabs>
      <br />
      <hr />
      {"4. <XOrderedTabs default={Ordered.First} beforeTabLabel={(_, isSelected) => <> ... </>}>"}
      <hr/>
      <br />
      <XOrderedTabs default={Ordered.First} beforeTabLabel={(_, isSelected) => <>
        <input type='radio' checked={isSelected} readOnly style={{ cursor: 'inherit' }}/>&nbsp;
      </>}>
        <XOrderedTab value={Ordered.First}>
          <div className="card">
            <ButtonCounter label={Ordered.First} />
          </div>
        </XOrderedTab>
        &nbsp;|&nbsp;
        <XOrderedTab value={Ordered.Second} render={
          <span style={{ color: 'red' }}>{Ordered.Second}</span>
        }>
          <div className="card">
            <ButtonCounter label={Ordered.Second} />
          </div>
        </XOrderedTab>
        &nbsp;|&nbsp;
        <XOrderedTab value={Ordered.Third} render={(val, isSelected) => <>
          <span style={{ background: isSelected ? 'green' : 'red' }}>{val.toString()}</span>
        </>}>
          <div className="card">
            <ButtonCounter label={Ordered.Third} />
          </div>
        </XOrderedTab>
      </XOrderedTabs>
      <br />
      <hr />
      {"5. <OrderedTabs />"}
      <hr/>
      <br />
      <OrderedTabs />
    </div>
  )
}

export default App
