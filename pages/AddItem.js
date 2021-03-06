import React, {useState, useEffect} from 'react'
import { itemCategories } from '../utils/itemCategories'

import {
    ScrollView,
    SafeAreaView,
    View, 
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { TextInput, DefaultTheme,Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import {Provider} from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import { itemsState } from '../state/itemsState';
import { useRecoilState } from 'recoil';
import { categoryList } from '../utils/categoryList';
import { categoryImages } from '../utils/categoryImages'
import { hungarianFoods } from '../utils/hungarianFoods'
import { db } from '../config/firebase'
import { deleteDoc, doc, setDoc, collection, onSnapshot, query, updateDoc, addDoc } from 'firebase/firestore'
import { hungarianList } from './../utils/hungarianList';

const AddItem= ({
    route: {
      params: { id }, // id of box
    },
    navigation,
  }) => {

    const [editedName, setEditedName] = useState('Valami')
    const [editedAmount, setEditedAmount] = useState('10')
    const [editedCategory, setEditedCategory] = useState(0)

    const [allItems, setAllItems] = useRecoilState(itemsState);
    const [checked, setChecked] = useState('first');

    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDownHun, setShowDropDownHun] = useState(false);
    const handleItemName = (name) => { setEditedName(name) }
    const handleItemAmount = (a) => { setEditedAmount(a) }

    const getColl = () => {
      const collectionRefItems = collection(db, 'items');
      const qu = query(collectionRefItems)
      const unsubscribe2 = onSnapshot(qu, querySnapshot => {
        setAllItems(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          box_index: doc.data().box_index,
          i_name: doc.data().i_name,
          i_amount: doc.data().i_amount,
          i_category: doc.data().i_category,
        })
      )
      )
      return unsubscribe2;
      })
    }

    const addItemNow = async () => {   
      const newItem = {
        box_index: id,
        i_amount: editedAmount,
        i_category: editedCategory,
        i_name: editedName,
      }
      await addDoc(collection(db, 'items'), newItem).then(() => {
        getColl();
      }) 
      navigation.navigate('H??t??')
      Toast.show(
          'Siker! Hozz??adva.'
        , {
        duration: Toast.durations.SHORT,
      })
    }
    return (
      <Provider theme={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 10, padding: 5, marginBottom: 2 }}>
            <TextInput required onChangeText={editedName => handleItemName(editedName)} style={{ color: "#eee", marginBottom: 10 }} value={editedName} mode="outlined" label="??lelmiszer neve"/>

            <TextInput required onChangeText={editedAmount => handleItemAmount(editedAmount)} style={{ color: "#eee", marginBottom: 10 }} value={editedAmount} mode="outlined" label="??lelmiszer mennyis??ge"
              placeholder="k??rlek add meg a m??rt??ket."
              keyboardType="numeric"
            />
            <View>
              <DropDown
                label={itemCategories[editedCategory].c_name}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={editedCategory}
                required
                setValue={setEditedCategory}
                list={categoryList}
              />
            </View>
            <View style={{ flexDirection:"row", padding: 10, justifyContent: 'center' }}>
              <Button onPress={addItemNow}>
                <Text style={{ color: "#000"}}>Hozz??ad <Ionicons name="add" size={25} color="black" /></Text>
              </Button>
            </View>
            </View>
        </SafeAreaView>
        </Provider>
    )
  }
export default AddItem