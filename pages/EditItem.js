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
const EditItem= ({
    route: {
      params: { category, amount, name },
    },
    navigation,
  }) => {

    const [editedName, setEditedName] = useState(name)
    const [editedAmount, setEditedAmount] = useState(amount)
    const [editedCategory, setEditedCategory] = useState(category)

    const [showDropDown, setShowDropDown] = useState(false);

    const categoryList = [
      {
        label: "Zöldségek",
        value: "1",
      },
      {
        label: "Gyümölcsök",
        value: "2",
      },
      {
        label: "Húsok",
        value: "3",
      },
      {
        label: "Mirelit ételek",
        value: "4",
      },
      {
        label: "Egyéb",
        value: "5",
      },
    ];

    const handleItemName = (name) => { setEditedName(name) }
    const handleItemAmount = (a) => { setEditedAmount(a) }

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
              <Button>
                <Text style={{ color: "red"}}>Törlés <Ionicons name="trash" size={25} color="red" /></Text>
              </Button>
            </View>
            </View>
        </SafeAreaView>
        </Provider>
    )
  }
export default EditItem