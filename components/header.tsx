import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Appbar,
  Menu,
  useTheme,
} from 'react-native-paper';
import Import from '../screens/import';
import Export from '../screens/export';
import Location from '../screens/location';
import Settings from '../screens/settings';

interface Props {
  title: string
}

const Header = ({ title }: Props) : JSX.Element => {
  const theme = useTheme();

  const [visible, setVisible] = React.useState({
    menu: false,
    import: false,
    export: false,
    location: false,
    settings: false,
  });

  const close = {
    menu: () => setVisible({ ...visible, menu: false }),
    import: () => setVisible({ ...visible, import: false }),
    export: () => setVisible({ ...visible, export: false }),
    location: () => setVisible({ ...visible, location: false }),
    settings: () => setVisible({ ...visible, settings: false }),
  };

  const open = {
    menu: () => setVisible({ ...visible, menu: true }),
    import: () => setVisible({ ...visible, import: true, menu: false }),
    export: () => setVisible({ ...visible, export: true, menu: false }),
    location: () => setVisible({ ...visible, location: true, menu: false }),
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
        <Appbar.Content title={title} />
        <Menu
          visible={visible.menu}
          onDismiss={close.menu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={open.menu} />}
        >
          <Menu.Item onPress={open.import} icon="download" title="Import" />
          <Menu.Item onPress={open.export} icon="upload" title="Export" />
          <Menu.Item onPress={open.location} icon="map-marker" title="Location" />
          <Menu.Item onPress={open.settings} icon="cog" title="Settings" />
        </Menu>
      </Appbar.Header>
      <Import visible={visible.import} close={close.import} />
      <Export visible={visible.export} close={close.export} />
      <Location visible={visible.location} close={close.location} />
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
