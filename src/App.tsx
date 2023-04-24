import './App.css'
import { ButtonCounter, GenTabs, IXTabsDefaultProps, TabsContentPlaceholder, XTab, newXTab, XTabs, newXTabs } from './components'
import { useState } from 'react'

import { useObjectEntries } from './components/XTabs/hooks'

enum Ordered {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
}

// const XTabs = newXTabs<Ordered>();
// const XTab = newXTab<Ordered>();

const tabsDefaultProps: IXTabsDefaultProps<unknown> = {
  beforeTabLabel(_, isSelected) {
    return <span>{isSelected ? '✅' : '❌'}</span>;
  },
}

// const XOrderedTabs = XTabs<Ordered>;
// XOrderedTabs.defaultProps = {
//   beforeTabLabel: (val, isSelected) => <span>{isSelected ? '✌' : '✊'}</span>,
// } as IXTabsDefaultProps<Ordered>;

// const XOrderedTab = XTab<Ordered>;

// const OrderedTabs = function() {
//   return <XOrderedTabs contentPlaceholder={TabsContentPlaceholder.BeforeTabs} default={Ordered.First} beforeTabLabel={(_, isSelected) => <>
//     <input type='radio' checked={isSelected} readOnly style={{ cursor: 'inherit' }}/>&nbsp;
//   </>}>
//     <XOrderedTab value={Ordered.First}>
//       <div className="card">
//         <ButtonCounter label={Ordered.First} />
//       </div>
//     </XOrderedTab>
//     &nbsp;|&nbsp;
//     <XOrderedTab value={Ordered.Second} render={
//       <span style={{ color: 'red' }}>{Ordered.Second}</span>
//     }>
//       <div className="card">
//         <ButtonCounter label={Ordered.Second} />
//       </div>
//     </XOrderedTab>
//     &nbsp;|&nbsp;
//     <XOrderedTab value={Ordered.Third} render={(val, isSelected) => <>
//       <span style={{ background: isSelected ? 'green' : 'red' }}>{val.toString()}</span>
//     </>}>
//       <div className="card">
//         <ButtonCounter label={Ordered.Third} />
//       </div>
//     </XOrderedTab>
//   </XOrderedTabs>
// }

function App() {
  return (
    <div className="App">
      <hr />
      {"1. <XTabs default='First'>"}
      <hr/>
      <br />
      {/* <XTabs default='First'>
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
      </XTabs> */}
      <br />
      <hr />
      {"2. <XOrderedTabs default={Ordered.First}>"}
      <hr/>
      <br />
      {/* <XOrderedTabs default={Ordered.First}>
        <XOrderedTab value={Ordered.First}>
          <ButtonCounter label={Ordered.First} />
        </XOrderedTab>
        &nbsp;|&nbsp;
        <XOrderedTab value={Ordered.Second}>
          <ButtonCounter label={Ordered.Second} />
        </XOrderedTab>
        &nbsp;|&nbsp;
        <XOrderedTab value={Ordered.Third}>
          <ButtonCounter label={Ordered.Third} />
        </XOrderedTab>
      </XOrderedTabs> */}
      <br />
      <hr />
      {"3. <XTabs<Ordered> default={Ordered.First} beforeTabLabel={(_, isSelected) => <> ... </>}>"}
      <hr/>
      <br />
      {/* <XTabs<Ordered> default={Ordered.First} beforeTabLabel={(_, isSelected) => <>
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
      </XTabs> */}
      <br />
      <hr />
      {"4. <XOrderedTabs default={Ordered.First} beforeTabLabel={(_, isSelected) => <> ... </>}>"}
      <hr/>
      <br />
      {/* <XOrderedTabs default={Ordered.First} beforeTabLabel={(_, isSelected) => <>
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
      </XOrderedTabs> */}
      <br />
      <hr />
      {"5. <OrderedTabs />"}
      <hr/>
      <br />
      {/* <OrderedTabs /> */}
      <br />
      <hr />
      {"6. <UserTabs />"}
      <hr/>
      <br />
      <UserTabs />
      <br />
      <hr />
      {"6. <GenUserTabs />"}
      <hr/>
      <br />
      <GenUserTabs />
    </div>
  )
}

type TUserModel = {
  readonly id: number;
  readonly name: string;
  readonly surname: string;
  readonly age: number;
  readonly email: string;
};

const XUserTabs = newXTabs<TUserModel>(tabsDefaultProps);
const XUserTab = newXTab<TUserModel>();
// XUserTabs.defaultProps = {
//   beforeTabLabel: () => 'asd'
// } as IXTabsDefaultProps<TUserModel>;

function UserTabs() {
  const [user, setUser] = useState<TUserModel>(() => ({
    id: 1,
    name: 'John',
    surname: 'Doe',
    age: 30,
    email: 'johndoe@mail.com',
  }));

  return (
    <XUserTabs default="name">
      <XUserTab value='name'>
        <div className="card">
          <ButtonCounter label={user.name} />
        </div>
      </XUserTab>
      &nbsp;|&nbsp;
      <XUserTab value="surname">
        <div className="card">
          <ButtonCounter label={user.surname} />
        </div>
      </XUserTab>
      &nbsp;|&nbsp;
      <XUserTab value="age">
        <div className="card">
          <ButtonCounter label={user.age.toString()} />
        </div>
      </XUserTab>
      &nbsp;|&nbsp;
      <XUserTab value="email">
        <div className="card">
          <ButtonCounter label={user.email} />
        </div>
      </XUserTab>
    </XUserTabs>
  )
}

function GenUserTabs() {
  const [user, setUser] = useState<TUserModel>(() => ({
    id: 1,
    name: 'John',
    surname: 'Doe',
    age: 30,
    email: 'johndoe@mail.com',
  }));

  const [_id, ...userProps] = useObjectEntries(user);

  return (
    <GenTabs tabsComp={XUserTabs}
      default="name"
      entries={userProps}
      render={(propName: keyof TUserModel, propValue: number | string) => (
        <XUserTab value={propName}>
          <div className="card">
            <ButtonCounter label={propValue.toString()} />
          </div>
        </XUserTab>
      )}
    />
  );
}

export default App
