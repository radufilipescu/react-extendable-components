import type { Meta, StoryObj } from '@storybook/react';

import { 
  newXTabs, newXTab, 
  TabsContentPlaceholder, GenTabs, 
  IXTabsProps, IXTabsDefaultProps, XTabs 
} from '../../components';
import { CSSProperties } from 'react';

const meta = {
  title: 'Get Started/XTabs',
  decorators: [
    function(Story, ctx) {
      const orderedTabsDefaultProps: IXTabsDefaultProps<Ordered> = { ...ctx.tabsDefaultProps };
      orderedTabsDefaultProps.beforeTabLabel = (_, isSelected) => (
        <span style={{ margin: '5px'}}>{isSelected ? '✌' : '✊'}</span>
      );

      const orderedTabDefaultProps: IXTabsDefaultProps<Ordered> = { ...ctx.tabDefaultProps };

      const orderedTabsDefaultProps2: IXTabsDefaultProps<Ordered> = { ...ctx.tabsDefaultProps };
      orderedTabsDefaultProps2.beforeTabLabel = (_, isSelected) => (
        <span style={{ margin: '5px'}}>{isSelected ? '✅' : '❌'}</span>
      );

      return (
        <Story 
          orderedTabsDefaultProps={orderedTabsDefaultProps}
          orderedTabDefaultProps={orderedTabDefaultProps}

          orderedTabsDefaultProps2={orderedTabsDefaultProps2}
        />
      )
    }
  ]
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

export const TypedEnumBasedTabs = (args: any, ctx: any) => {
  const OrderedTabs = newXTabs<Ordered>(ctx.orderedTabsDefaultProps);
  const OrderedTab = newXTab<Ordered>(ctx.orderedTabDefaultProps);

  const OrderedTabs2 = newXTabs<Ordered>(ctx.orderedTabsDefaultProps2);

  return <>
    <OrderedTabs default={Ordered.First}>
      <OrderedTab value={Ordered.First}>
        <TabContent value={Ordered.First} />
      </OrderedTab>
      <OrderedTab value={Ordered.Second}>
        <TabContent value={Ordered.Second} />
      </OrderedTab>
      <OrderedTab value={Ordered.Third}>
        <TabContent value={Ordered.Third} />
      </OrderedTab>
    </OrderedTabs>
    <hr />
    <OrderedTabs2 default={Ordered.First}>
      <OrderedTab value={Ordered.First}>
        <TabContent value={Ordered.First} />
      </OrderedTab>
      <OrderedTab value={Ordered.Second}>
        <TabContent value={Ordered.Second} />
      </OrderedTab>
      <OrderedTab value={Ordered.Third}>
        <TabContent value={Ordered.Third} />
      </OrderedTab>
    </OrderedTabs2>
  </>
};