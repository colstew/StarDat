import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Surface,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import Header from '../components/header';
import SweepTable from '../components/sweep-table';
import VolPlotTable from '../components/volplot-table';
import TableTabs from '../components/table-tabs';
import { useAppSelector } from '../redux/hooks';

const SummaryScreen = () : JSX.Element => {
  const sweeps = useAppSelector((state) => state.data.sweeps);
  const volplots = useAppSelector((state) => state.data.volplots);
  const [activeSweepTab, setActiveSweepTab] = React.useState('1');
  const [activeVolPlotTab, setActiveVolPlotTab] = React.useState('1');
  const theme = useTheme();
  const sweepTabs = sweeps.length > 1;
  const volPlotTabs = volplots.length > 1;

  const sweepDisplay = () => {
    if (sweeps.length > 0) {
      const index = Number(activeSweepTab) - 1;
      return (
        <>
          {sweepTabs && (
            <TableTabs
              activeTab={activeSweepTab}
              setTab={setActiveSweepTab}
              count={sweeps.length}
            />
          )}
          <View style={[
            style.dataRow,
            !sweepTabs && style.noTabs,
            { borderColor: theme.colors.border },
          ]}
          >
            <Text style={style.data}>{`DBH: ${sweeps[index].dbh} cm`}</Text>
            <Text style={style.data}>{`Height: ${sweeps[index].height} m`}</Text>
          </View>
          <SweepTable summary trees={sweeps[index].trees} />
        </>
      );
    }
    return (
      <Text>No Sweeps to show</Text>
    );
  };

  const volPlotDisplay = () => {
    if (volplots.length > 0) {
      const index = Number(activeVolPlotTab) - 1;
      return (
        <>
          {volPlotTabs && (
            <TableTabs
              activeTab={activeVolPlotTab}
              setTab={setActiveVolPlotTab}
              count={volplots.length}
            />
          )}
          <View style={[
            style.dataRow,
            !volPlotTabs && style.noTabs,
            { borderColor: theme.colors.border },
          ]}
          >
            <ScrollView horizontal contentContainerStyle={style.scrollContent}>
              <Text style={style.data}>{`Average Piece: ${Math.round(volplots[index].avgPiece * 1000) / 1000}`}</Text>
              <Text style={style.data}>{`SPH: ${Math.round(volplots[index].plotSPH * 100) / 100}`}</Text>
              <Text style={style.data}>{`VPH: ${Math.round(volplots[index].plotVolHa * 100) / 100}`}</Text>
              <Text style={[style.data, { marginRight: 20 }]}>{`VBAR: ${Math.round(volplots[index].vbar * 1000) / 1000}`}</Text>
            </ScrollView>
          </View>
          <VolPlotTable summary trees={volplots[index].trees} />
        </>
      );
    }
    return (
      <Text>No Volume Plots to show</Text>
    );
  };

  return (
    <>
      <Header title="Summary" />
      <View style={style.container}>
        <Surface style={style.topSurface}>
          <Title>Sweeps</Title>
          {sweepDisplay()}
        </Surface>
        <Surface style={style.bottomSurface}>
          <Title>Volume Plots</Title>
          {volPlotDisplay()}
        </Surface>
      </View>
    </>
  );
};

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
    padding: 12,
    elevation: 4,
    borderRadius: 8,
  },
  bottomSurface: {
    flex: 1,
    margin: 6,
    padding: 12,
    marginTop: 0,
    elevation: 4,
    borderRadius: 8,
  },
  scrollContent: {
    minWidth: '100%',
    justifyContent: 'space-evenly',
  },
  dataRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    marginBottom: 5,
  },
  noTabs: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  data: {
    marginLeft: 20,
    marginVertical: 12,
  },
});

export default SummaryScreen;
