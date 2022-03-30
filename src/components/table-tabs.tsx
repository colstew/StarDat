import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  ToggleButton,
  Text,
  useTheme,
} from 'react-native-paper';

interface Props {
  activeTab: string,
  setTab: (value: string) => void,
  count: number,
}

const TableTabs = ({ activeTab, setTab, count } :Props) : JSX.Element => {
  const theme = useTheme();
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
      <ScrollView
        horizontal
        style={[style.scroll, {
          borderColor: theme.colors.border,
          borderRadius: theme.roundness,
        }]}
      >
        {count > 1 && tabs}
      </ScrollView>
    </ToggleButton.Row>
  );
};

const style = StyleSheet.create({
  scroll: {
    borderWidth: 1.5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 5,
  },
  tab: {
    borderRadius: 0,
    borderRightWidth: 0.3,
    width: 76,
    height: 48,
  },
});

export default TableTabs;
