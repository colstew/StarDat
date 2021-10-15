import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ToggleButton,
  Text,
} from 'react-native-paper';

interface Props {
  activeTab: string,
  setTab: (value: string) => void,
  count: number,
}

const TableTabs = ({ activeTab, setTab, count } :Props) : JSX.Element => {
  const updateTab = (value: string) => {
    if (value) setTab(value);
  };
  const tabs = [];
  for (let index = 0; index < count; index += 1) {
    tabs.push(
      <ToggleButton
        key={index}
        style={style.tab}
        icon={() => <Text>{index + 1}</Text>}
        value={(index + 1).toString()}
      />,
    );
  }
  return (
    <ToggleButton.Row onValueChange={updateTab} value={activeTab}>
      {count > 1 && tabs}
    </ToggleButton.Row>
  );
};

const style = StyleSheet.create({
  tab: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default TableTabs;
