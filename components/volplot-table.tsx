import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataTable, useTheme, IconButton } from 'react-native-paper';
import { VolPlotTree } from '../contexts/state-context';

interface Props {
  tabs?: boolean,
  trees: VolPlotTree[],
  removeTree?: (index: number) => void,
}

const VolPlotTable = ({ tabs, trees, removeTree }: Props) : JSX.Element => {
  const theme = useTheme();
  return (
    <>
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
            {removeTree && <DataTable.Title numeric> </DataTable.Title>}
          </DataTable.Header>
          <ScrollView>
            {trees.map((tree, index) => (
              <DataTable.Row key={tree.toString() + Math.random().toString()}>
                <DataTable.Cell>{tree.species}</DataTable.Cell>
                <DataTable.Cell numeric>{tree.dbh}</DataTable.Cell>
                <DataTable.Cell numeric>{tree.height}</DataTable.Cell>
                <DataTable.Cell numeric>{tree.nf}</DataTable.Cell>
                {removeTree && (
                  <DataTable.Cell numeric>
                    <IconButton
                      icon="minus-circle-outline"
                      size={20}
                      onPress={() => removeTree(index)}
                    />
                  </DataTable.Cell>
                )}
              </DataTable.Row>
            ))}
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
