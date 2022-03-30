import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DataTable, useTheme, IconButton } from 'react-native-paper';
import { VolPlotTree } from '../utils/data-types';

interface Props {
  summary?: boolean,
  trees: VolPlotTree[],
  removeTree?: (index: number) => void,
}

const VolPlotTable = ({ summary, trees, removeTree }: Props) : JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <View style={style.tableView}>
        <ScrollView
          horizontal
          contentContainerStyle={style.horizontalScrollContent}
          style={[
            style.horizontalScroll,
            summary && style.withTabs,
            {
              borderColor: theme.colors.border,
              borderRadius: theme.roundness,
            },
          ]}
        >
          <View style={style.horizontalScrollView}>
            <DataTable.Header>
              <DataTable.Title style={style.header}>Species</DataTable.Title>
              <DataTable.Title numeric style={style.header}>DBH (cm)</DataTable.Title>
              <DataTable.Title numeric style={style.header}>Height (m)</DataTable.Title>
              <DataTable.Title numeric style={style.header}>NF (%)</DataTable.Title>
              <DataTable.Title numeric style={style.header}>Volume</DataTable.Title>
              <DataTable.Title numeric style={style.header}>SPH</DataTable.Title>
              <DataTable.Title numeric style={style.header}>VPH</DataTable.Title>
              {removeTree && <DataTable.Title numeric> </DataTable.Title>}
            </DataTable.Header>
            <ScrollView>
              {trees.map((tree, index) => (
                <DataTable.Row key={tree.toString() + Math.random().toString()}>
                  <DataTable.Cell style={style.cell}>{tree.species}</DataTable.Cell>
                  <DataTable.Cell numeric style={style.cell}>{tree.dbh}</DataTable.Cell>
                  <DataTable.Cell numeric style={style.cell}>{tree.height}</DataTable.Cell>
                  <DataTable.Cell numeric style={style.cell}>{tree.nf}</DataTable.Cell>
                  <DataTable.Cell
                    numeric
                    style={style.cell}
                  >
                    {Math.round(tree.volume * 100) / 100}
                  </DataTable.Cell>
                  <DataTable.Cell
                    numeric
                    style={style.cell}
                  >
                    {Math.round(tree.sph * 100) / 100}
                  </DataTable.Cell>
                  <DataTable.Cell
                    numeric
                    style={style.cell}
                  >
                    {Math.round(tree.volha * 100) / 100}
                  </DataTable.Cell>
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
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  tableView: {
    marginBottom: 12,
    flex: 1,
  },
  withTabs: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1.5,
  },
  horizontalScroll: {
    borderWidth: 0.3,
    // width: '100%',
  },
  horizontalScrollContent: {
    minWidth: '100%',
  },
  horizontalScrollView: {
    width: '100%',
  },
  header: {
    width: 65,
    // margin: 10,
  },
  cell: {
    width: 65,
    // marginLeft: 30,
  },
});

export default VolPlotTable;
