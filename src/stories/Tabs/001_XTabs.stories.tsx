import type { Meta, StoryObj } from '@storybook/react';

import { 
    XTabs, XTab, TabsContentPlaceholder, GenTabs, 
    IXTabsProps, IXTabsDefaultProps 
} from '../../components';
import { CSSProperties } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Get Started/XTabs',
} satisfies Meta<typeof XTabs>;

export default meta;

enum Ordered {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
}

const CARD_STYLE: CSSProperties = {
  padding: '2em',
  border: '1px solid #ccc',
};

function TabContent(props: { value: Ordered }) {
  return <div style={CARD_STYLE}>
    <p>Current value: {props.value}</p>
  </div>
}

export function EnumBasedTabs(){ 
  return (
    <XTabs<Ordered> default={Ordered.First}>
      <XTab<Ordered> value={Ordered.First}>
        <TabContent value={Ordered.First} />
      </XTab>
      <XTab<Ordered> value={Ordered.Second}>
        <TabContent value={Ordered.Second} />
      </XTab>
      <XTab<Ordered> value={Ordered.Third}>
        <TabContent value={Ordered.Third} />
      </XTab>
    </XTabs>
  )
};