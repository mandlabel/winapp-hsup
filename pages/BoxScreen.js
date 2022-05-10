import * as React from 'react';

import { List, Card, Title, Paragraph, Button } from 'react-native-paper';
import { categoryImages } from '../utils/categoryImages';
import { boxStyle } from '../styles/boxStyle';
import {
  ScrollView,
  SafeAreaView,
  View, 
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const BoxItem = ({ name, amount, category }) => 
{
    return (
    <List.Item
        title={name}
        description={amount}
        left={props => <Image {...props} style={{ width: 50, height: 50 }} source={categoryImages[category-1]}
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

    const handleItemSubmit = ({ name, amount, category }) => {
      navigation.navigate('EditItem', {
        name,
        amount,
        category,
      })
    }

    const showAddProduct = () => {
      alert('Add product :D')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
          
        {/*------------------------------------------------------------*/}
        <Card style={{ marginTop: 10, borderWidth: 1, padding: 10 }}>
          <Card.Title title={`Doboz neve: ${name}`} subtitle={`Méret: ${size}`}/>
          <Button onPress={showAddProduct}>
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
            return (
              <TouchableOpacity key={index}
              onPress={() =>
                handleItemSubmit({
                  name: item.i_name,
                  amount: item.i_amount,
                  category: item.i_category,
                })
              }>
                <BoxItem name={item.i_name} amount={item.i_amount} category={item.i_category}/>
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
