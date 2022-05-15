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
import { appState } from '../state/appState';
import { useRecoilState } from 'recoil';

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

    const handleItemName = (name) => { setEditedName(name) }
    const handleItemAmount = (amount) => { setEditedAmount(amount) }

    const handleDelete = (i_id) => {
      navigation.navigate('Hűtő')
    }
    return (
      <Provider theme={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: 10, padding: 5, marginBottom: 2 }}>
            <TextInput onChangeText={editedName => handleItemName(editedName)} style={{ color: "#eee", marginBottom: 10 }} value={editedName} mode="outlined" label="Élelmiszer neve"/>
            <TextInput keyboardType="numeric" onChangeText={editedAmount => handleItemAmount(editedAmount)} style={{ color: "#eee", marginBottom: 10 }} value={JSON.stringify(editedAmount)} mode="outlined" label="Élelmiszer mennyisége"/>
            <View>
              <DropDown
                label={itemCategories[category-1].c_name}
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
              <Button>
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