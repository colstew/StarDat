import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Switch,
  IconButton,
} from 'react-native-paper';
import PreferencesContext from '../contexts/preferences-context';

interface Props {
  visible: boolean,
  close: () => void,
}

const Settings = ({ visible, close } : Props) : JSX.Element => {
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
        <Dialog.Title>Settings</Dialog.Title>
        <Dialog.Content>
          <View style={style.themeSwitchView}>
            <Switch
              value={isThemeDark}
              onValueChange={toggleTheme}
            />
            <IconButton icon={isThemeDark ? 'weather-night' : 'weather-sunny'} />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const style = StyleSheet.create({
  themeSwitchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Settings;
