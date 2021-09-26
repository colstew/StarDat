import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Title } from 'react-native-paper';
import Header from '../components/header';
import SweepTable from '../components/sweep-table';
import VolPlotTable from '../components/volplot-table';

const SummaryScreen = () : JSX.Element => (
  <>
    <Header />
    <View style={style.container}>
      <Surface style={style.topSurface}>
        <Title>Sweeps</Title>
        <SweepTable tabs />
      </Surface>
      <Surface style={style.bottomSurface}>
        <Title>Volume Plots</Title>
        <VolPlotTable tabs />
      </Surface>
    </View>
  </>
);

const style = StyleSheet.create({

  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1024,
  },
  topSurface: {
    flex: 1,
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
});

export default SummaryScreen;
