import classNames from "classnames";
import { Component } from "react";

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  onSelect: (index: number) => void;
  currentTab: number;
}

export default class Tabs extends Component<TabsProps> {
  render(): JSX.Element {
    const { tabs, onSelect, currentTab } = this.props;

    return (
      <div className="tabContainer">
        {tabs.map((tab, index) => {
          return (
            <div
              className={classNames("tabContent", {
                active: index === currentTab,
              })}
              key={index}
              onClick={() => {
                onSelect(index);
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
    );
  }
}