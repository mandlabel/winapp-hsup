import * as React from 'react';

import { List } from 'react-native-paper';

import { useRecoilState } from "recoil";
import { appState } from '../state/appState';

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
const boxStyle = {
  backgroundColor: "#eee", padding: 10, marginBottom: 10, borderWidth: 0.5,
}

const HomeScreen = ({ navigation }) => {

  const boxData = [
    {
      id: 1,
      name: "nagy doboz",
      size: "large",
      items: [{
        i_name: "rakott krumpli",
        i_amount: "10dkg",
      },
      {
        i_name: "rakott krumpli",
        i_amount: "10dkg",
      },
      {
        i_name: "rakott krumpli",
        i_amount: "10dkg",
      },
    
    
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
