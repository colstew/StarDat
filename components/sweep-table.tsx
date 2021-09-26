import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import TableTabs from './table-tabs';

interface Props{
  tabs? : boolean,
}
const SweepTable = ({ tabs = false } : Props) : JSX.Element => (
  <>
    {tabs && <TableTabs />}
    <View style={style.tableView}>
      <DataTable style={tabs ? [style.table, style.tableWithTabs] : style.table}>
        <DataTable.Header>
          <DataTable.Title>Species</DataTable.Title>
          <DataTable.Title numeric>Count</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          <DataTable.Row>
            <DataTable.Cell>C 175</DataTable.Cell>
            <DataTable.Cell numeric>2</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>F 575</DataTable.Cell>
            <DataTable.Cell numeric>1</DataTable.Cell>
          </DataTable.Row>
        </ScrollView>
      </DataTable>
    </View>
  </>
);

const style = StyleSheet.create({
  tableView: {
    flex: 1,
    marginBottom: 12, // interMargin,
  },
  table: {
    flex: 1,
    borderWidth: 0.75,
    borderRadius: 4, // match theme
    borderColor: 'lightgray', // match theme
  },
  tableWithTabs: {
    borderTopLeftRadius: 0,
  },
});

export default SweepTable;
