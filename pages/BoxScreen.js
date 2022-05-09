import * as React from 'react';
import { useRecoilState } from "recoil";
import { appState } from '../state/appState';

import {
  ScrollView,
  SafeAreaView,
  View, 
  Text,
  TouchableOpacity
} from 'react-native';

const BoxScreen= ({
    route: {
      params: { id, size, name, items },
    },
    navigation,
  }) => {
    const [state, setState] = useRecoilState(appState)
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 15 }}>
        <View style={{ padding: 12 }}>
        {
          items.map((item, index) => {
            return (
                
              <TouchableOpacity key={index}>
                <Text>{item.i_name}{item.i_amount}</Text>
              </TouchableOpacity>
              
            )
          })
        }
        </View>
        </ScrollView>
        </SafeAreaView>
    );
};

export default BoxScreen;
