import * as React from 'react';

import { List, Card, Title, Paragraph, Button } from 'react-native-paper';
import { categoryImages } from '../utils/categoryImages';
import { boxStyle } from '../styles/boxStyle';

import { db } from '../config/firebase';
import { updateDoc, doc, deleteDoc, collection, onSnapshot, query } from 'firebase/firestore'
import {
  ScrollView,
  SafeAreaView,
  View, 
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

const BoxItem = ({ name, amount, category }) => 
{
    return (
    <List.Item
        title={name}
        description={amount}
        left={props => <Image {...props} PlaceholderContent={<ActivityIndicator />} style={{ width: 50, height: 50 }} source={categoryImages[category]}
        />}
        style={boxStyle} 
    />
    )
}
const BoxScreen= ({
    route: {
      params: { id, size, name, items },
    },
    navigation,
  }) => {

    const handleItemSubmit = async ({ id, boxid, name, amount, category }) => {
      if(category !== 0) {
        navigation.navigate('EditItem', {
          id,
          boxid,
          name,
          amount,
          category,
        })
      } else { // Hibás törlése
        await deleteDoc(doc(db, "items", id));
        navigation.navigate('Hűtőm')
      }
    }

    const handleAddSubmit = ({ id }) => {
        navigation.navigate('AddItem', {
          id, // box id
        })
      }
    return (
        <SafeAreaView style={{ flex: 1 }}>
          
        {/*------------------------------------------------------------*/}
        <Card style={{ marginTop: 10, borderWidth: 1, padding: 10 }}>
          <Card.Title title={`Doboz neve: ${name}`} subtitle={`Méret: ${size}`}/>
          <Button onPress={() => handleAddSubmit({
            id: id,
          })}>
            <Text>Termék felvétele</Text>
          </Button>
        </Card>
        {/*------------------------------------------------------------*/}
        <View style={{ margin: 5, paddng: 10, justifyContent: 'center' }}>
          
        </View>
        <ScrollView style={{ marginTop: 15 }}>
        <View style={{ padding: 12 }}>
        {
          items.map((item, index) => {
            if(item.box_index === id) {
            return (
              <TouchableOpacity key={index}
              onPress={() =>
                handleItemSubmit({
                  id: item.id,
                  boxid: id,
                  name: item.i_name,
                  amount: item.i_amount,
                  category: item.i_category,
                })
              }>
                <BoxItem name={item.i_name} amount={item.i_amount} category={item.i_category}/>
              </TouchableOpacity>
              
            )
          }
          })
        }
        </View>
        </ScrollView>
        </SafeAreaView>
    );
};

export default BoxScreen;
