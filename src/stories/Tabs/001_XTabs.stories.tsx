import type { Meta, StoryObj } from '@storybook/react';

import { 
  newXTabs, XTabs, newXTab, XTab, TabsContentPlaceholder, GenTabs, 
  IXTabsProps, IXTabsDefaultProps 
} from '../../components';
import { CSSProperties } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Get Started/XTabs',
} satisfies Meta<XTabs<any>>;

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

export function EnumBasedTabs(args: any, ctx: any) {
  const OrderedXTabs = newXTabs<Ordered>(ctx.tabsDefaultProps);
  const OrderedXTab = newXTab<Ordered>(ctx.tabDefaultProps);

  return (
    <OrderedXTabs default={Ordered.First}>
      <OrderedXTab value={Ordered.First}>
        <TabContent value={Ordered.First} />
      </OrderedXTab>
      <OrderedXTab value={Ordered.Second}>
        <TabContent value={Ordered.Second} />
      </OrderedXTab>
      <OrderedXTab value={Ordered.Third}>
        <TabContent value={Ordered.Third} />
      </OrderedXTab>
    </OrderedXTabs>
  )
};