import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Subheading,
  Dialog,
  Portal,
  Caption,
  RadioButton,
  Text,
} from 'react-native-paper';
import { StorageAccessFramework } from 'expo-file-system';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setExportDir } from '../redux/reducers';
import { exportSweeps, exportVolPlots } from '../utils/data-migrate';

interface Props {
  visible: boolean,
  close: () => void,
}

/*
interface SelectedState {
  message: string
  enabled: boolean,
  exported: boolean
}
*/

const Export = ({ visible, close } : Props) : JSX.Element => {
  const [exportMode, setExportMode] = React.useState('sweeps');
  const [status, setStatus] = React.useState({
    message: 'Please select directory',
    enabled: false,
    exported: false,
  });
  const sweeps = useAppSelector((state) => state.data.sweeps);
  const volplots = useAppSelector((state) => state.data.volplots);
  const speciesNames = useAppSelector((state) => state.settings.speciesNames);
  const speciesNumbers = useAppSelector((state) => state.settings.speciesNumbers);
  const block = useAppSelector((state) => state.settings.blockName);
  const user = useAppSelector((state) => state.settings.userName);
  const uri = useAppSelector((state) => state.settings.exportDir);
  const dispatch = useAppDispatch();

  const exportData = () => {
    const speciesNamesLong = Object.values(speciesNames);
    const combinedSpecies = speciesNamesLong.flatMap((name) => speciesNumbers.map((number) => `${name} ${number}`));
    if (sweeps.length && uri && (exportMode === 'sweeps' || exportMode === 'both')) {
      exportSweeps(sweeps, combinedSpecies, uri, block, user);
      setStatus({ ...status, exported: true });
    }
    if (volplots.length && uri && (exportMode === 'volumeplots' || exportMode === 'both')) {
      exportVolPlots(volplots, uri, block, user);
      setStatus({ ...status, exported: true });
    }
  };

  const selectDirectory = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const permittedUri = permissions.directoryUri;
      const regexp = /%\d[A-Z]/;
      const directoryArr = permittedUri.split(regexp).slice(1);
      const directory = directoryArr.join('/').concat('/');
      setStatus({
        message: directory,
        enabled: true,
        exported: false,
      });
      dispatch(setExportDir(permittedUri));
    }
  };

  const reset = () => {
    setStatus({ ...status, exported: false });
    close();
  };

  const noData = () => (
    <Dialog.Content>
      <Subheading>No data availabe for export</Subheading>
    </Dialog.Content>
  );

  const preExport = () => (
    <>
      <Dialog.Content>
        <RadioButton.Group
          onValueChange={(value) => setExportMode(value)}
          value={exportMode}
        >
          <View style={style.row}>
            <View style={[style.row, style.option]}>
              <RadioButton value="sweeps" />
              <Text>Sweeps</Text>
            </View>
            <View style={[style.row, style.option]}>
              <RadioButton value="volumeplots" />
              <Text>Volume Plots</Text>
            </View>
            <View style={[style.row, style.option]}>
              <RadioButton value="both" />
              <Text>Both</Text>
            </View>
          </View>
        </RadioButton.Group>
        <Subheading style={style.dirSubheading}>Export Directory</Subheading>
        <Caption>{status.message}</Caption>
        <Button
          style={style.button}
          mode="outlined"
          onPress={selectDirectory}
        >
          {status.enabled ? 'Change Directory' : 'Select Directory'}
        </Button>
      </Dialog.Content>
      <Dialog.Actions>
        <Button disabled={!status.enabled} onPress={exportData}>Export</Button>
        <Button onPress={close}>Cancel</Button>
      </Dialog.Actions>
    </>
  );

  const postExport = () => (
    <>
      <Dialog.Content>
        <Subheading>Data exported to</Subheading>
        <Caption>{status.message}</Caption>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={reset}>Done</Button>
      </Dialog.Actions>
    </>
  );

  const dialogContent = () => {
    if (sweeps.length > 0 || volplots.length > 0) {
      if (status.exported) return postExport();
      return preExport();
    }
    return noData();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={reset}>
        <Dialog.Title>Export</Dialog.Title>
        {dialogContent()}
      </Dialog>
    </Portal>
  );
};

export default Export;

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dialog: {
    width: '85%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  option: {
    marginRight: 8,
  },
  dirSubheading: {
    marginTop: 12,
  },
  button: {
    marginTop: 12,
    marginBottom: 12,
    maxWidth: 310,
  },
});
