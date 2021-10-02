import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataTable, useTheme } from 'react-native-paper';
import TableTabs from './table-tabs';

interface Props {
  tabs?: boolean;
}

const VolPlotTable = ({ tabs = false }: Props) : JSX.Element => {
  const theme = useTheme();
  return (
    <>
      {tabs && <TableTabs />}
      <View style={style.tableView}>
        <DataTable style={[
          style.table,
          tabs && style.tableWithTabs,
          {
            borderColor: theme.colors.border,
            borderRadius: theme.roundness,
          },
        ]}
        >
          <DataTable.Header>
            <DataTable.Title>Species</DataTable.Title>
            <DataTable.Title numeric>DBH (cm)</DataTable.Title>
            <DataTable.Title numeric>Height (m)</DataTable.Title>
            <DataTable.Title numeric>NF (%)</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            <DataTable.Row>
              <DataTable.Cell>C 175</DataTable.Cell>
              <DataTable.Cell numeric>31</DataTable.Cell>
              <DataTable.Cell numeric>22</DataTable.Cell>
              <DataTable.Cell numeric>99</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>F 575</DataTable.Cell>
              <DataTable.Cell numeric>36</DataTable.Cell>
              <DataTable.Cell numeric>27</DataTable.Cell>
              <DataTable.Cell numeric>99</DataTable.Cell>
            </DataTable.Row>
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  tableView: {
    marginBottom: 12,
    flex: 1,
  },
  table: {
    flex: 1,
    borderWidth: 0.3,
  },
  tableWithTabs: {
    borderTopLeftRadius: 0,
  },
});

export default VolPlotTable;
