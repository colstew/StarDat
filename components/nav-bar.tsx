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
    >
      <Tab.Screen
        name="Sweep"
        component={SweepScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return <MaterialCommunityIcons name="plus-circle" size={24} color={color} />;
            }
            return <MaterialCommunityIcons name="plus-circle-outline" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Volume Plot"
        component={VolPlotScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return <MaterialCommunityIcons name="plus-circle-multiple" size={24} color={color} />;
            }
            return <MaterialCommunityIcons name="plus-circle-multiple-outline" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return <MaterialCommunityIcons name="text-box" size={24} color={color} />;
            }
            return <MaterialCommunityIcons name="text-box-outline" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
