import type { Meta, StoryObj } from '@storybook/react';

import { 
  XTabs, XTab, TabsContentPlaceholder, GenTabs, 
  IXTabsProps, IXTabsDefaultProps 
} from '../../components';

const XOrderedTabs = XTabs<Ordered>;
const XOrderedTab = XTab<Ordered>;

const meta = {
  title: 'Get Started/XTabs',
  decorators: [
    function(Story) {
      
      XOrderedTabs.defaultProps = {
        beforeTabLabel: (val, isSelected) => (
          <span style={{ margin: '5px'}}>{isSelected ? '✌' : '✊'}</span>
        ),
      } satisfies IXTabsDefaultProps<Ordered>;

      return <Story />
    }
  ]
} satisfies Meta<typeof XOrderedTabs>;

export default meta;

enum Ordered {
	First = 'First',
	Second = 'Second',
	Third = 'Third',
}

function TabContent(props: { value: Ordered }) {
  return <div style={{ padding: '2em' }}>
    <p>Current value: {props.value}</p>
  </div>
}

export const TypedEnumBasedTabs = () => (
  <XOrderedTabs default={Ordered.First}>
    <XOrderedTab value={Ordered.First}>
      <TabContent value={Ordered.First} />
    </XOrderedTab>
    <XOrderedTab value={Ordered.Second}>
      <TabContent value={Ordered.Second} />
    </XOrderedTab>
    <XOrderedTab value={Ordered.Third}>
      <TabContent value={Ordered.Third} />
    </XOrderedTab>
  </XOrderedTabs>
);