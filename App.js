
import * as React from 'react';
import 'react-native-gesture-handler';
import 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootSiblingParent } from 'react-native-root-siblings';

import HomeScreen from './pages/HomeScreen';
import ScanScreen from './pages/ScanScreen';
import ProfileScreen from './pages/ProfileScreen';
import BoxScreen from './pages/BoxScreen';
import EditItem from './pages/EditItem';
import AddItem from './pages/AddItem';
import AddHungarianItem from './pages/AddHungarianItem';

import { RecoilRoot } from 'recoil';
const Stack = createStackNavigator();
const Nav = createBottomTabNavigator();

function App() {
  return (
    <RootSiblingParent>
    <RecoilRoot>
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Hűtő" component={HomeStack} options={{ headerShown: false }}/>
        <Stack.Screen name="Doboz" component={BoxScreen} />
        <Stack.Screen name="EditItem" component={EditItem} options={{ title: 'Termék'}}/>
        <Stack.Screen name="AddItem" component={AddItem} options={{ title: 'Hozzáadás'}}/>
        <Stack.Screen name="AddHungarianItem" component={AddHungarianItem} options={{ title: 'Magyar specialitások'}}/>
    </Stack.Navigator>
    </NavigationContainer>
  </RecoilRoot>
  </RootSiblingParent>
  );
}

const HomeStack = () => (
      <Nav.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          borderRadius: 30,
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingHorizontal: 30,
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          marginLeft: 10,
          marginRight: 10,
          paddingBottom: 5,
          height: 70,
          position: 'absolute',
          bottom: 20,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'
            color = 'black'
          } else if (route.name === 'Home') {
            iconName = focused ? 'add' : 'add-outline'
            color = 'black'
            size = 40;
          } else if (route.name === 'MyFridge') {
            iconName = focused ? 'fast-food' : 'fast-food-outline'
            color = 'black'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Nav.Screen name="MyFridge" component={HomeScreen} options={{ title: 'Hűtőm' }} />
      <Nav.Screen name="Home" component={ScanScreen} options={{ title: 'Doboz felvétele', headerShown: false }} />
      <Nav.Screen name="Profile" component={ProfileScreen} options={{ title: 'WIN' }} />
    </Nav.Navigator>
)
export default App;