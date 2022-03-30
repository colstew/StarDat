import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Surface } from 'react-native-paper';
import Header from '../components/header';
import TreeButtons from '../components/tree-buttons';
import VolPlotTable from '../components/volplot-table';
import AddButton from '../components/add-button';
import SaveButton from '../components/save-button';
import VolplotTextInput from '../components/volplot-text-input';
import { VolPlotTree } from '../utils/data-types';
import getLocation from '../utils/get-location';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addVolPlot } from '../redux/reducers';
import {
  calcAvgPiece,
  calcPlotSPH,
  calcPlotVolHa,
  calcSPH,
  calcVbar,
  calcVol,
} from '../utils/calc';

const VolPlotScreen = () : JSX.Element => {
  const dispatch = useAppDispatch();
  const baf = useAppSelector((state) => state.settings.baf);
  const utop = useAppSelector((state) => state.settings.utop);
  const defaultNF = useAppSelector((state) => state.settings.defaultNF);

  const [species, setSpecies] = React.useState('');
  const [value, setValue] = React.useState('');
  const [dbhStr, setDBH] = React.useState('');
  const [heightStr, setHeight] = React.useState('');
  const [nfStr, setNF] = React.useState(defaultNF.toString());
  const [trees, setTrees] = React.useState<VolPlotTree[]>([]);
  const [addEnable, setAddEnable] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (species && value && dbhStr && heightStr && nfStr) setAddEnable(true);
    else setAddEnable(false);
  }, [species, value, dbhStr, heightStr, nfStr]);

  const addTree = () => {
    if (species && value && dbhStr && heightStr && nfStr) {
      const dbh = Number(dbhStr);
      const height = Number(heightStr);
      const nf = Number(nfStr);
      const volume = calcVol(dbh, height, utop, nf);
      const sph = calcSPH(dbh, baf);
      const volha = volume * sph;
      trees.push({
        species: `${species} ${value}`,
        dbh,
        height,
        nf,
        volume,
        sph,
        volha,
      });
      setDBH('');
      setHeight('');
      setNF(defaultNF.toString());
      setTrees([...trees]);
    }
  };

  const removeTree = (index: number) => {
    trees.splice(index, 1);
    setTrees([...trees]);
  };

  const onSave = async () => {
    const plotVolHa = calcPlotVolHa(trees);
    const plotSPH = calcPlotSPH(trees);
    const avgPiece = calcAvgPiece(trees);
    const vbar = calcVbar(avgPiece, baf);
    const temp = {
      baf,
      utop,
      trees,
      plotVolHa,
      plotSPH,
      avgPiece,
      vbar,
    };
    setSpecies('');
    setValue('');
    setDBH('');
    setHeight('');
    setTrees([]);
    setNF('99');
    dispatch(addVolPlot({
      location: await getLocation(),
      ...temp,
    }));
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
            height={heightStr}
            setHeight={setHeight}
            dbh={dbhStr}
            setDBH={setDBH}
            nf={nfStr}
            setNF={setNF}
          />
          <AddButton enabled={addEnable} addTree={addTree} />
        </Surface>
        <Surface style={style.bottomSurface}>
          <VolPlotTable trees={trees} removeTree={removeTree} />
          <SaveButton hidden={keyboardShow} enabled={trees.length > 0} onSave={onSave} />
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
