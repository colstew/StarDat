import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Switch,
  IconButton,
  List,
  TextInput,
} from 'react-native-paper';
import StateContext from '../contexts/state-context';

interface Props {
  visible: boolean,
  close: () => void,
}

const Settings = ({ visible, close } : Props) : JSX.Element => {
  const { toggleTheme, isThemeDark } = React.useContext(StateContext);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
        <View style={style.titleView}>
          <Dialog.Title>Settings</Dialog.Title>
          <View style={style.themeSwitchView}>
            <Switch
              value={isThemeDark}
              onValueChange={toggleTheme}
            />
            <IconButton icon={isThemeDark ? 'weather-night' : 'weather-sunny'} />
          </View>
        </View>
        <Dialog.Content>
          <List.Section>
            <List.Item
              title="Block Name"
              onPress={() => undefined}
              right={() => <TextInput mode="outlined" dense style={{ width: 80 }} />}
            />
            <List.Item
              title="User Name"
              onPress={() => undefined}
              right={() => <TextInput mode="outlined" dense style={{ width: 80 }} />}
            />
            <List.Item
              title="Basal Area Factor"
              onPress={() => undefined}
              right={() => <TextInput mode="outlined" dense style={{ width: 80 }} />}
            />
            <List.Item
              title="Default Net Factor"
              onPress={() => undefined}
              right={() => <TextInput mode="outlined" dense style={{ width: 80 }} />}
            />
            <List.Item
              title="U-Top"
              onPress={() => undefined}
              right={() => <TextInput mode="outlined" dense style={{ width: 80 }} />}
            />
            <List.Item
              title="Species Names"
              onPress={() => undefined}
              right={() => <List.Icon icon="square-edit-outline" style={{ width: 80 }} />}
            />
          </List.Section>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const style = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
  },
  themeSwitchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Settings;
