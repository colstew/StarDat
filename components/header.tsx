import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Appbar,
  Menu,
  IconButton,
  useTheme,
} from 'react-native-paper';
import Import from '../screens/import';
import Export from '../screens/export';
import Settings from '../screens/settings';

const Header = () : JSX.Element => {
  const theme = useTheme();

  const [visible, setVisible] = React.useState({
    menu: false,
    import: false,
    export: false,
    settings: false,
  });

  const close = {
    menu: () => setVisible({ ...visible, menu: false }),
    import: () => setVisible({ ...visible, import: false }),
    export: () => setVisible({ ...visible, export: false }),
    settings: () => setVisible({ ...visible, settings: false }),
  };

  const open = {
    menu: () => setVisible({ ...visible, menu: true }),
    import: () => setVisible({ ...visible, import: true, menu: false }),
    export: () => setVisible({ ...visible, export: true, menu: false }),
    settings: () => setVisible({ ...visible, settings: true, menu: false }),
  };

  return (
    <>
      <Appbar.Header
        style={style.header}
        theme={{
          colors: {
            primary: theme?.colors.surface,
          },
        }}
      >
        <Menu
          visible={visible.menu}
          onDismiss={close.menu}
          anchor={<IconButton icon="dots-vertical" onPress={open.menu} />}
        >
          <Menu.Item onPress={open.import} icon="download" title="Import" />
          <Menu.Item onPress={open.export} icon="upload" title="Export" />
          <Menu.Item onPress={open.settings} icon="cog" title="Settings" />
        </Menu>
      </Appbar.Header>
      <Import visible={visible.import} close={close.import} />
      <Export visible={visible.export} close={close.export} />
      <Settings visible={visible.settings} close={close.settings} />
    </>
  );
};

const style = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
  },
  themeSwitchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
