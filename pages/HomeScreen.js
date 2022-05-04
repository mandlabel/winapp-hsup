import * as React from 'react';

import { List } from 'react-native-paper';

import { useRecoilState } from "recoil";
import { appState } from '../state/appState';

import {
  ScrollView,
  SafeAreaView,
  View, 
  Text
} from 'react-native';


const BoxItem = ({ id, name, size, items }) => (
  <List.Item
      title={name}
      description={size}
      left={props => <List.Icon {...props} icon="box" />}
      style={boxStyle} 
  />
)
const boxStyle = {
  backgroundColor: "#eee", padding: 10, marginBottom: 10, shadow: 1,
}

const HomeScreen = () => {

  const boxData = [
    {
      id: 1,
      name: "nagy doboz",
      size: "large",
      items: [
        "rakott krumpli", "borsó", "hasábburgonya"
      ],
    },
    {
      id: 2,
      name: "közepes doboz",
      size: "medium",
      items: [],
    },
    {
      id: 3,
      name: "kicsi doboz",
      size: "small",
      items: [],
    },
  ]

  const [state, setState] = useRecoilState(appState)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <ScrollView>
        {
          boxData.map((b, index) => {
            return <BoxItem key={index} id={b.id} size={b.size} name={b.name} items={b.items}/>
          })
        }
        </ScrollView>
        <View><Text>{state}</Text></View>
        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
