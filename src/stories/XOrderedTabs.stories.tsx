import type { Meta, StoryObj } from '@storybook/react';

import { 
  XTabs, XTab, TabsContentPlaceholder, GenTabs, 
  IXTabsProps, IXTabsDefaultProps 
} from '../components';

const XOrderedTabs = XTabs<Ordered>;
// XOrderedTabs.defaultProps = {
//   beforeTabLabel: (val, isSelected) => (
//     <span style={{ margin: '5px'}}>{isSelected ? '✌' : '✊'}</span>
//   ),
// } satisfies IXTabsDefaultProps<Ordered>;

const XOrderedTab = XTab<Ordered>;

const meta = {
  title: 'Example/XTabs',
} satisfies Meta<typeof XOrderedTabs>;

export default meta;

enum Ordered {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
}

function OrderedTabContent(props: { value: Ordered }) {
  return <div style={{ padding: '2em' }}>
    <p>Current value: {props.value}</p>
  </div>
}

export const TypedEnumBasedTabs = () => (
  <XOrderedTabs default={Ordered.First}>
    <XOrderedTab value={Ordered.First}>
      <OrderedTabContent value={Ordered.First} />
    </XOrderedTab>
    <XOrderedTab value={Ordered.Second}>
      <OrderedTabContent value={Ordered.Second} />
    </XOrderedTab>
    <XOrderedTab value={Ordered.Third}>
      <OrderedTabContent value={Ordered.Third} />
    </XOrderedTab>
  </XOrderedTabs>
);