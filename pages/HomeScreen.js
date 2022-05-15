import React, {useState, useEffect} from 'react';

import { List } from 'react-native-paper';

import { useRecoilState } from "recoil";
import { appState } from '../state/appState';

import { boxStyle } from '../styles/boxStyle';

import { db } from '../config/firebase'
import { deleteDoc, doc, updateDoc, collection, onSnapshot, query } from 'firebase/firestore'

import {
  ScrollView,
  SafeAreaView,
  View, 
  Text,
  TouchableOpacity
} from 'react-native';

const HomeScreen = ({ navigation }) => {

  const [boxData, setBoxData] = useState([])

  useEffect(() => {
    const collectionRef = collection(db, 'boxes');
    const q = query(collectionRef)
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setBoxData(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          size: doc.data().size,
          items: doc.data().items,
        })
      )
    )
  })
    return unsubscribe;
  }, [])
  
  
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
                  id: boxData.indexOf(b),
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

const BoxItem = ({ id, name, size, items }) => (
  <List.Item
      title={name}
      description={items.map(e => e.i_name).join(', ')}
      left={props => <List.Icon {...props} icon="box" />}
      style={boxStyle} 
  />
)

export default HomeScreen;
