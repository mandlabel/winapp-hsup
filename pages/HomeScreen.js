import React, {useState, useEffect} from 'react';

import { List } from 'react-native-paper';

import { useRecoilState } from "recoil";
import { itemsState } from '../state/itemsState'
import { boxState } from '../state/boxState'
import { boxStyle } from '../styles/boxStyle';

import { db } from '../config/firebase'
import { deleteDoc, doc, updateDoc, collection, onSnapshot, query } from 'firebase/firestore'

import { winPic } from '../utils/winPic';

import {
  ScrollView,
  SafeAreaView,
  View, 
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

const HomeScreen = ({ navigation }) => {

  const [boxData, setBoxData] = useRecoilState(boxState)
  const [itemsData, setItemsData] = useRecoilState(itemsState)

  useEffect(() => {

    const collectionRefItems = collection(db, 'items');
    const qu = query(collectionRefItems)
    const unsubscribe2 = onSnapshot(qu, querySnapshot => {
    setItemsData(
      querySnapshot.docs.map(doc => ({
        id: doc.id,
        box_index: doc.data().box_index,
        i_name: doc.data().i_name,
        i_amount: doc.data().i_amount,
        i_category: doc.data().i_category,
      })
    )
    )
    })

    const collectionRef = collection(db, 'boxes');
    const q = query(collectionRef)
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setBoxData(
        querySnapshot.docs.map(doc => ({
          id: doc.data().id,
          name: doc.data().name,
          size: doc.data().size,
        })
      )
    )
    })
  return unsubscribe, unsubscribe2;
    
  }, [])
  
  const BoxItem = ({ name, size }) => (
    <List.Item
        title={name}
        description={'Kapacitás: ' + size + ' db'}
        left={props => <Image {...props} PlaceholderContent={<ActivityIndicator />} style={{ width: 60, height: 60 }} source={winPic.logo}
        />}
        style={boxStyle} 
    />
  )

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
                  items: itemsData,
                })
              }>
                <BoxItem id={b.id} size={b.size} name={b.name}/>
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
