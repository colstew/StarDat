import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SweepScreen from '../screens/sweep-screen';
import VolPlotScreen from '../screens/volplot-screen';
import SummaryScreen from '../screens/summary-screen';

const Tab = createMaterialBottomTabNavigator();

export default function NavBar() : React.ReactElement {
  return (
    <Tab.Navigator
      initialRouteName="Summary"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Sweep') {
            iconName = focused
              ? 'plus-circle'
              : 'plus-circle-outline';
          } else if (route.name === 'Volume Plot') {
            iconName = focused
              ? 'plus-circle-multiple'
              : 'plus-circle-multiple-outline';
          } else if (route.name === 'Summary') {
            iconName = focused
              ? 'text-box'
              : 'text-box-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Sweep" component={SweepScreen} />
      <Tab.Screen name="Volume Plot" component={VolPlotScreen} />
      <Tab.Screen name="Summary" component={SummaryScreen} />
    </Tab.Navigator>
  );
}
