import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  Dialog,
  Portal,
  RadioButton,
  Chip,
  Subheading,
} from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

interface Props {
  visible: boolean,
  close: () => void,
}

interface SelectedState {
  uri: string | null,
  name: string | null,
  chip: React.ReactElement | null,
}

const Import = ({ visible, close } : Props) : JSX.Element => {
  const [importMode, setImportMode] = React.useState('append');
  const [dataType, setDataType] = React.useState('sweep');
  const [selected, setSelected] = React.useState<SelectedState>({
    uri: null,
    name: null,
    chip: null,
  });

  const updateSelected = (fileReturned?: DocumentPicker.DocumentResult) => {
    if (fileReturned === undefined) {
      setSelected({
        uri: null,
        name: null,
        chip: null,
      });
    } else if (fileReturned.type === 'success') {
      setSelected({
        uri: fileReturned.uri,
        name: fileReturned.name,
        chip: <Chip icon="file" onClose={updateSelected}>{fileReturned.name}</Chip>,
      });
    }
  };

  const closeImport = () => {
    updateSelected();
    close();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close} style={style.dialog}>
        <Dialog.Title>Import Data</Dialog.Title>
        <Dialog.Content>
          <Subheading>Mode</Subheading>
          <RadioButton.Group
            onValueChange={(value) => setImportMode(value)}
            value={importMode}
          >
            <View style={style.row}>
              <View style={[style.row, style.option]}>
                <RadioButton value="append" />
                <Text>Append</Text>
              </View>
              <View style={[style.row, style.option]}>
                <RadioButton value="overwrite" />
                <Text>Overwrite</Text>
              </View>
            </View>
          </RadioButton.Group>
          <Subheading>Data Type</Subheading>
          <RadioButton.Group
            onValueChange={(value) => setDataType(value)}
            value={dataType}
          >
            <View style={style.row}>
              <View style={[style.row, style.option]}>
                <RadioButton value="sweep" />
                <Text>Sweep</Text>
              </View>
              <View style={[style.row, style.option]}>
                <RadioButton value="volplot" />
                <Text>Volume Plot</Text>
              </View>
            </View>
          </RadioButton.Group>
          <Button
            style={style.button}
            mode="contained"
            onPress={async () => {
              const fileReturn = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
                copyToCacheDirectory: false,
              });
              updateSelected(fileReturn);
            }}
          >
            Select File
          </Button>
          {selected.chip}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeImport}>
            Import
          </Button>
          <Button onPress={closeImport}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

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
    paddingRight: 6,
  },
  button: {
    marginTop: 12,
    marginBottom: 12,
    maxWidth: 310,
  },
});

export default Import;
