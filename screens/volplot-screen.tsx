import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import Header from '../components/header';
import TreeButtons from '../components/tree-buttons';
import VolPlotTable from '../components/volplot-table';
import AddButton from '../components/add-button';
import SaveButton from '../components/save-button';
import VolplotTextInput from '../components/volplot-text-input';

const VolPlotScreen = () : JSX.Element => (
  <>
    <Header />
    <View style={style.container}>
      <Surface style={style.topSurface}>
        <TreeButtons />
        <VolplotTextInput />
        <AddButton />
      </Surface>
      <Surface style={style.bottomSurface}>
        <VolPlotTable />
        <SaveButton />
      </Surface>
    </View>
  </>
);

const style = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      maxWidth: 1024,
    },
    topSurface: {
      margin: 6,
      padding: 12, // interMargin,
      elevation: 4,
      borderRadius: 8, // match theme
    },
    bottomSurface: {
      flex: 1,
      margin: 6,
      padding: 12, // interMargin,
      marginTop: 0,
      elevation: 4,
      borderRadius: 8, // match theme
    },
  },
);

export default VolPlotScreen;
