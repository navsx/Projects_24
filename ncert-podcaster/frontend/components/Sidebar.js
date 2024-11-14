import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Avatar, Drawer } from 'react-native-paper';

const Sidebar = () => {
  const navigation = useNavigation();
  console.log('Rendering Sidebar');

  return (
    <Drawer.Section style={styles.drawerSection}>
      <View style={styles.userInfo}>
        <Avatar.Text size={40} label="US" />
        <View style={styles.nameInfo}>
          <Text>User Name</Text>
          <Text>student@example.com</Text>
        </View>
      </View>
      <Drawer.Item
        label="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Drawer.Item
        label="Learning History"
        onPress={() => navigation.navigate('History')}
      />
      <Drawer.Item
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Drawer.Item
        label="Logout"
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
      />
    </Drawer.Section>
  );
};

const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 15,
  },
  userInfo: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInfo: {
    marginLeft: 15,
  },
});

export default Sidebar;
