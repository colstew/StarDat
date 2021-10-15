import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Surface } from 'react-native-paper';
import Header from '../components/header';
import TreeButtons from '../components/tree-buttons';
import VolPlotTable from '../components/volplot-table';
import AddButton from '../components/add-button';
import SaveButton from '../components/save-button';
import VolplotTextInput from '../components/volplot-text-input';
import StateContext, { VolPlotTree } from '../contexts/state-context';
import getLocation from '../datahandle';

const VolPlotScreen = () : JSX.Element => {
  const { addPlot } = React.useContext(StateContext);
  const [species, setSpecies] = React.useState('');
  const [value, setValue] = React.useState('');
  const [dbh, setDBH] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [nf, setNF] = React.useState('99');
  const [trees, setTrees] = React.useState<VolPlotTree[]>([]);
  const addTree = () => {
    if (species && value && dbh && height && nf) {
      trees.push({
        species: `${species} ${value}`,
        dbh,
        height,
        nf,
        volume: 'To Calc', // TODO: do vol calc
      });
      setTrees([...trees]);
    }
  };
  const removeTree = (index: number) => {
    trees.splice(index, 1);
    setTrees([...trees]);
  };
  const onSave = async () => {
    if (trees.length > 0) {
      Keyboard.dismiss();
      setSpecies('');
      setValue('');
      setDBH('');
      setHeight('');
      setTrees([]);
      setNF('99');
      addPlot({
        loc: await getLocation(),
        baf: 8, // // TODO: get from settings
        trees,
        volhaPlot: 0, // TODO: calc
        sphPlot: 0, // TODO: calc
        pieceAvg: 0, // TODO: calc
        vbar: 0, // TODO: calc

      });
    }
  };
  return (
    <>
      <Header title="New Volume Plot" />
      <View style={style.container}>
        <Surface style={style.topSurface}>
          <TreeButtons
            species={species}
            setSpecies={setSpecies}
            value={value}
            setValue={setValue}
          />
          <VolplotTextInput
            height={height}
            setHeight={setHeight}
            dbh={dbh}
            setDBH={setDBH}
            nf={nf}
            setNF={setNF}
          />
          <AddButton addTree={addTree} />
        </Surface>
        <Surface style={style.bottomSurface}>
          <VolPlotTable trees={trees} removeTree={removeTree} />
          <SaveButton onSave={onSave} />
        </Surface>
      </View>
    </>
  );
};

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
