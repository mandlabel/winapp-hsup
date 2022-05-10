import * as React from 'react';

import { List } from 'react-native-paper';

import { useRecoilState } from "recoil";
import { appState } from '../state/appState';

import { boxStyle } from '../styles/boxStyle';
import {
  ScrollView,
  SafeAreaView,
  View, 
  Text,
  TouchableOpacity
} from 'react-native';


const BoxItem = ({ id, name, size, items }) => (
  <List.Item
      title={name}
      description={items.map(e => e.i_name).join(', ')}
      left={props => <List.Icon {...props} icon="box" />}
      style={boxStyle} 
  />
)


const HomeScreen = ({ navigation }) => {

  const boxData = [
    {
      id: 1,
      name: "nagy doboz",
      size: "nagy",
      items: [{
        i_name: "zeller",
        i_amount: "10",
        i_category: 1,
      },
      {
        i_name: "eper",
        i_amount: "30",
        i_category: 2,
      },
      {
        i_name: "teszt husi2",
        i_amount: "10",
        i_category: 3,
      },
      {
        i_name: "teszt husi",
        i_amount: "30",
        i_category: 3,
      },
      {
        i_name: "mirelit pizza",
        i_amount: "10",
        i_category: 4,
      },
      {
        i_name: "valami ami nemtudom mi de lefagyasztottuk",
        i_amount: "10",
        i_category: 5,
      },
      ],
    },
    {
      id: 2,
      name: "közepes doboz",
      size: "közepes",
      items: [],
    },
    {
      id: 3,
      name: "kicsi doboz",
      size: "kicsi",
      items: [],
    },
  ]

  const [state, setState] = useRecoilState(appState)

  const handleBoxSubmit = ({ id, size, name, items }) => {
    navigation.navigate('Doboz', {
      id,
      size,
      name,
      items,
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <ScrollView style={{ marginTop: 15 }}>
        {
          boxData.map((b, index) => {
            return (
              <TouchableOpacity key={index}
              onPress={() =>
                handleBoxSubmit({
                  id: b.id,
                  size: b.size,
                  name: b.name,
                  items: b.items,
                })
              }>
                <BoxItem id={b.id} size={b.size} name={b.name} items={b.items}/>
              </TouchableOpacity>
            )
          })
        }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
