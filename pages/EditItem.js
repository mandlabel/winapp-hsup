import React, {useState} from 'react'
import { itemCategories } from '../utils/itemCategories'

import {
    ScrollView,
    SafeAreaView,
    View, 
    Text,
    StyleSheet
} from 'react-native';
import { TextInput, DefaultTheme,Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import {Provider} from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import { categoryList } from '../utils/categoryList';
import { useRecoilState } from 'recoil';
import { db } from '../config/firebase';
import { updateDoc, doc, deleteDoc, collection, onSnapshot, query } from 'firebase/firestore'
import { itemsState } from '../state/itemsState';
const EditItem= ({
    route: {
      params: { id, boxid, category, amount, name },
    },
    navigation,
  }) => {

    const [editedName, setEditedName] = useState(name)
    const [editedAmount, setEditedAmount] = useState(amount)
    const [editedCategory, setEditedCategory] = useState(category)

    const [showDropDown, setShowDropDown] = useState(false);
    const [allItems, setAllItems] = useRecoilState(itemsState);

    const handleItemName = (name) => { setEditedName(name) }
    const handleItemAmount = (amount) => { setEditedAmount(amount) }

    const handleDelete = async (i_id) => {
      navigation.navigate('Hűtő')
      await deleteDoc(doc(db, "items", i_id));
      getColl()
    }

    const handleEdit = async (i_id) => {
      await updateDoc(doc(db, "items", i_id), {
        i_name: editedName,
        i_amount: editedAmount,
        i_category: editedCategory,
      });
      navigation.navigate('Hűtő')
      getColl()
    }
    
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

    return (
      <Provider theme={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 10, padding: 5, marginBottom: 2 }}>
            <TextInput onChangeText={editedName => handleItemName(editedName)} style={{ color: "#eee", marginBottom: 10 }} value={editedName} mode="outlined" label="Élelmiszer neve"/>
            <TextInput keyboardType="numeric" onChangeText={editedAmount => handleItemAmount(editedAmount)} style={{ color: "#eee", marginBottom: 10 }} value={editedAmount} mode="outlined" label="Élelmiszer mennyisége"/>
            <View>
              <DropDown
                label={itemCategories[category].c_name}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={editedCategory}
                setValue={setEditedCategory}
                list={categoryList}
              />
            </View>
            <View style={{ flexDirection:"row", padding: 10, justifyContent: 'center' }}>
              <Button onPress={() => handleEdit(id)}>
                <Text style={{ color: "#000"}}>Módosítás <Ionicons name="pencil" size={25} color="black" /></Text>
              </Button>
              <Button onPress={() => handleDelete(id)}>
                <Text style={{ color: "red"}}>Törlés <Ionicons name="trash" size={25} color="red" /></Text>
              </Button>
            </View>
            </View>
        </SafeAreaView>
        </Provider>
    )
  }
export default EditItem