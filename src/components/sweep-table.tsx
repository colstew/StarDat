import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataTable, useTheme, IconButton } from 'react-native-paper';
import { SweepTrees } from '../utils/data-types';

interface Props{
  tabs?: boolean
  trees: SweepTrees,
  removeTree?: (key: string) => void,
}

const SweepTable = ({ tabs, trees, removeTree } : Props) : JSX.Element => {
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
            <DataTable.Title numeric>Count</DataTable.Title>
            {removeTree && <DataTable.Title numeric> </DataTable.Title>}
          </DataTable.Header>
          <ScrollView>
            {Object.keys(trees).map((key) => (
              <DataTable.Row key={key}>
                <DataTable.Cell>{key}</DataTable.Cell>
                <DataTable.Cell numeric>{trees[key]}</DataTable.Cell>
                {removeTree && (
                  <DataTable.Cell numeric>
                    <IconButton
                      icon="minus-circle-outline"
                      size={20}
                      onPress={() => removeTree(key)}
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
    flex: 1,
    marginBottom: 12, // interMargin,
  },
  table: {
    flex: 1,
    borderWidth: 0.3,
  },
  tableWithTabs: {
    borderTopLeftRadius: 0,
  },
});

export default SweepTable;
