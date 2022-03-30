import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Surface } from 'react-native-paper';
import Header from '../components/header';
import TreeButtons from '../components/tree-buttons';
import AddButton from '../components/add-button';
import SaveButton from '../components/save-button';
import SweepTable from '../components/sweep-table';
import SweepTextInput from '../components/sweep-text-input';
import getLocation from '../utils/get-location';
import { SweepTrees } from '../utils/data-types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSweep } from '../redux/reducers';

const SweepScreen = () : JSX.Element => {
  const dispatch = useAppDispatch();
  const baf = useAppSelector((state) => state.settings.baf);
  const speciesNames = useAppSelector((state) => state.settings.speciesNames);

  const [species, setSpecies] = useState('');
  const [value, setValue] = useState('');
  const [dbh, setDBH] = useState('');
  const [height, setHeight] = useState('');
  const [trees, setTrees] = useState<SweepTrees>({});
  const [saveEnable, setSaveEnable] = useState(false);
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
    const haveTrees = Object.keys(trees).length > 0;
    if (haveTrees && dbh && height) setSaveEnable(true);
    else setSaveEnable(false);
  }, [trees, dbh, height]);

  const addTree = () => {
    if (species && value) {
      const key = `${speciesNames[species]} ${value}`;
      if (trees[key]) {
        trees[key] += 1;
      } else {
        trees[key] = 1;
      }
      setTrees({ ...trees });
    }
  };
  const removeTree = (key: string) => {
    if (trees[key] > 0) {
      trees[key] -= 1;
    }
    if (trees[key] === 0) {
      delete trees[key];
    }
    setTrees({ ...trees });
  };
  const onSave = async () => {
    const temp = {
      baf,
      trees,
      dbh: Number(dbh),
      height: Number(height),
    };
    setSpecies('');
    setValue('');
    setDBH('');
    setHeight('');
    setTrees({});
    dispatch(addSweep({
      location: await getLocation(),
      ...temp,
    }));
  };

  return (
    <>
      <Header title="New Sweep" />
      <View style={style.container}>
        <Surface style={style.topSurface}>
          <TreeButtons
            species={species}
            setSpecies={setSpecies}
            value={value}
            setValue={setValue}
          />
          <AddButton enabled={Boolean(species && value)} addTree={addTree} />
        </Surface>
        <Surface style={style.bottomSurface}>
          <SweepTable trees={trees} removeTree={removeTree} />
          <SweepTextInput
            height={height}
            setHeight={setHeight}
            dbh={dbh}
            setDBH={setDBH}
          />
          <SaveButton hidden={keyboardShow} enabled={saveEnable} onSave={onSave} />
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
  row: {
    flexDirection: 'row',
    marginBottom: 12, // interMargin,
  },
  textInputL: {
    flex: 1,
    height: 52,
    marginRight: 4,
  },
  textInputR: {
    flex: 1,
    height: 52,
    marginLeft: 4,
  },
});

export default SweepScreen;
