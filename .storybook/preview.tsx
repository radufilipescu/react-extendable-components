import React, { CSSProperties } from "react";
import type { Preview } from "@storybook/react";

import { newXTabs, newXTab, IXTabsDefaultProps } from "../src/components";
import { IXTabDefaultProps } from "../src/components/XTabs";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    function(Story) {
      const TAB_RADIO_STYLE: CSSProperties = {
        margin: '0.5em',
        cursor: 'inherit',
      };
      
      const TAB_LABEL_STYLE: CSSProperties = {
        cursor: 'inherit',
      };

      function TabLabel(props: { value: any, isSelected: boolean }) {
        return (
          <label 
            style={{ 
              ...TAB_LABEL_STYLE, 
              textDecoration: props.isSelected ? 'underline overline #FF3028' : undefined, 
            }}>
            {props.value}
          </label>
        )
      };

      const tabsDefaultProps: IXTabsDefaultProps<unknown> = {
        beforeTabLabel: (val, isSelected) => {
          return (
            <input type='radio' style={TAB_RADIO_STYLE} checked={isSelected} readOnly />
          )
        },
      };
      
      const TAB_CONTAINER_STYLE: CSSProperties = {
        display: 'inline-block',
        padding: '1em',
        border: '1px solid #ccc',
        margin: '0.5em',
      };
      
      const tabDefaultProps: IXTabDefaultProps<unknown> = {
        tabComp: ({ children, style, ...rest }: { children: React.ReactNode, style?: CSSProperties }) => {
          return (
            <div {...rest} style={{...style, ...TAB_CONTAINER_STYLE}}>
              {children}
            </div>
          )
        },
        render: (value, isSelected) => {
          return (
            <TabLabel value={value} isSelected={isSelected} />
          )
        },
      };

      return (
        <Story 
          tabsDefaultProps={tabsDefaultProps}
          tabDefaultProps={tabDefaultProps}
        />
      );
    }
  ]
};

export default preview;
