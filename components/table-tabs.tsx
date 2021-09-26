import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ToggleButton,
  Text,
} from 'react-native-paper';

const TableTabs = () : JSX.Element => {
  const [tab, setTab] = React.useState('1');
  return (
    <ToggleButton.Row onValueChange={(value) => setTab(value)} value={tab}>
      <ToggleButton style={style.tab} icon={() => <Text>1</Text>} value="1" />
      <ToggleButton style={style.tab} icon={() => <Text>2</Text>} value="2" />
      <ToggleButton style={style.tab} icon={() => <Text>3</Text>} value="3" />
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
