import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Title } from 'react-native-paper';
import Header from '../components/header';
import SweepTable from '../components/sweep-table';
import VolPlotTable from '../components/volplot-table';
import TableTabs from '../components/table-tabs';
import { useAppSelector } from '../redux/hooks';

const SummaryScreen = () : JSX.Element => {
  const sweeps = useAppSelector((state) => state.sweeps);
  const volplots = useAppSelector((state) => state.volplots);
  const [activeSweepTab, setActiveSweepTab] = React.useState('1');
  const [activeVolPlotTab, setActiveVolPlotTab] = React.useState('1');

  const sweepDisplay = () => {
    if (sweeps.length > 0) {
      return (
        <>
          <TableTabs
            activeTab={activeSweepTab}
            setTab={setActiveSweepTab}
            count={sweeps.length}
          />
          <SweepTable tabs trees={sweeps[Number(activeSweepTab) - 1].trees} />
        </>
      );
    }
    return (
      <Text>No Sweeps to show</Text>
    );
  };

  const volPlotDisplay = () => {
    if (volplots.length > 0) {
      return (
        <>
          <TableTabs
            activeTab={activeVolPlotTab}
            setTab={setActiveVolPlotTab}
            count={volplots.length}
          />
          <VolPlotTable tabs trees={volplots[Number(activeVolPlotTab) - 1].trees} />
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
});

export default SummaryScreen;
