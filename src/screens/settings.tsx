import React from 'react';
import { StyleSheet, View, TextInput as NativeTextInput } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  List,
  TextInput,
} from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  setBlockName,
  setUserName,
  setBAF,
  setDefaultNF,
  setUTop,
} from '../redux/reducers';

interface Props {
  visible: boolean,
  close: () => void,
}

const Settings = ({ visible, close } : Props) : JSX.Element => {
  const blockName = useAppSelector((state) => state.settings.blockName);
  const userName = useAppSelector((state) => state.settings.userName);
  const baf = useAppSelector((state) => state.settings.baf);
  const nf = useAppSelector((state) => state.settings.defaultNF);
  const utop = useAppSelector((state) => state.settings.utop);
  const dispatch = useAppDispatch();

  const blockNameRef = React.useRef<NativeTextInput>(null);
  const userNameRef = React.useRef<NativeTextInput>(null);
  const bafRef = React.useRef<NativeTextInput>(null);
  const nfRef = React.useRef<NativeTextInput>(null);
  const utopRef = React.useRef<NativeTextInput>(null);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
        <View style={style.titleView}>
          <Dialog.Title>Settings</Dialog.Title>
        </View>
        <Dialog.Content>
          <List.Section>
            <List.Item
              title="Block Name"
              onPress={() => { if (blockNameRef.current) blockNameRef.current.focus(); }}
              right={() => <TextInput ref={blockNameRef} value={blockName} onChangeText={(val) => dispatch(setBlockName(val))} mode="outlined" dense style={style.textInput} />}
            />
            <List.Item
              title="User Name"
              onPress={() => { if (userNameRef.current) userNameRef.current.focus(); }}
              right={() => <TextInput ref={userNameRef} value={userName} onChangeText={(val) => dispatch(setUserName(val))} mode="outlined" dense style={style.textInput} />}
            />
            <List.Item
              title="Basal Area Factor"
              onPress={() => { if (bafRef.current) bafRef.current.focus(); }}
              right={() => <TextInput ref={bafRef} value={baf.toString()} onChangeText={(val) => dispatch(setBAF(Number(val)))} mode="outlined" dense style={style.textInput} />}
            />
            <List.Item
              title="Default Net Factor"
              onPress={() => { if (nfRef.current) nfRef.current.focus(); }}
              right={() => <TextInput ref={nfRef} value={nf.toString()} onChangeText={(val) => dispatch(setDefaultNF(Number(val)))} mode="outlined" dense style={style.textInput} />}
            />
            <List.Item
              title="U-Top"
              onPress={() => { if (utopRef.current) utopRef.current.focus(); }}
              right={() => <TextInput ref={utopRef} value={utop.toString()} onChangeText={(val) => dispatch(setUTop(Number(val)))} mode="outlined" dense style={style.textInput} />}
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
  textInput: {
    width: 110,
  },
});

export default Settings;
