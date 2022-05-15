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

import { appState } from '../state/appState';
import { useRecoilState } from 'recoil';
import { categoryList } from '../utils/categoryList';

const AddItem= ({
    route: {
      params: { id },
    },
    navigation,
  }) => {

    const [editedName, setEditedName] = useState('Valami')
    const [editedAmount, setEditedAmount] = useState('10')
    const [editedCategory, setEditedCategory] = useState(0)

    const [showDropDown, setShowDropDown] = useState(false);

    const handleItemName = (name) => { setEditedName(name) }
    const handleItemAmount = (a) => { setEditedAmount(a) }

    const [boxData, setBoxData] = useRecoilState(appState)

    const addItemNow = () => {
    }
    return (
      <Provider theme={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 10, padding: 5, marginBottom: 2 }}>
            <TextInput onChangeText={editedName => handleItemName(editedName)} style={{ color: "#eee", marginBottom: 10 }} value={editedName} mode="outlined" label="Élelmiszer neve"/>
            <TextInput onChangeText={editedAmount => handleItemAmount(editedAmount)} style={{ color: "#eee", marginBottom: 10 }} value={editedAmount} mode="outlined" label="Élelmiszer mennyisége"
              placeholder="useless placeholder"
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
                setValue={setEditedCategory}
                list={categoryList}
              />
            </View>
            <View style={{ flexDirection:"row", padding: 10, justifyContent: 'center' }}>
              <Button onPress={addItemNow}>
                <Text style={{ color: "#000"}}>Hozzáad <Ionicons name="add" size={25} color="black" /></Text>
              </Button>
            </View>
            </View>
        </SafeAreaView>
        </Provider>
    )
  }
export default AddItem