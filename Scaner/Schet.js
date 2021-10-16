import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, View, Text, Modal, Button, ActivityIndicator} from 'react-native';
import ListItem from './ListItem';
import Form from './Form';
import FetchData from './FetchDataPrice';
import { useFocusEffect } from '@react-navigation/core';

export default function Schet({Price, Order, setOrder}) {
  const [listOfItems, setListOfItems] = useState(Order)
  const [modalWindow, setModalWindow] = useState(false)
  const [fullPrice, setFullPrice] = useState(Price)
  const [data, setData] = useState([]);

  const addHandler = (text, cost) => {
    setListOfItems((list)=>{
      return[
        {text: text, cost: cost, key: Math.random().toString(36).substring(7) },
        ...list
      ]
    })
    setFullPrice(fullPrice+cost)
    setModalWindow(false);
  }

  const deleteHandler = (cost, key) => {
    setListOfItems((list)=>{
      return list.filter(listOfItems => listOfItems.key != key)
    });
    setFullPrice(fullPrice-cost)
  }
  let value = async () => {
    setData(await FetchData());
  };

  useFocusEffect( React.useCallback(() => {
    value();
  }, []));
  if (!data) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color="rgba(137,232,207,100)"
      />
    );
  } 
  return (
    <View>
      <Modal visible={modalWindow}>
        <Form addHandler={addHandler} priceList={data}/>
      </Modal>
      <Text style={styles.text}>Сумма всех заказов: {fullPrice}</Text>   
      <View>
        <Button title = "Добавить заказ" onPress = {()=>setModalWindow(true)}/>
        <FlatList data={listOfItems} renderItem={({item})=>(
          <ListItem el={item} deleteHandler={deleteHandler}/>
        )}
        scrollEnabled={true}
        style={styles.flatlist}/>
        <Button title = "Выставить столу заказ" onPress = {()=>setOrder(fullPrice, listOfItems)}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text:{
      textAlign: 'center',
      fontSize: 20
  },
  flatlist:{
    width: '100%',
    height: '75%',
    paddingTop: 35,
    paddingBottom: 35,
    borderRadius: 0,
    backgroundColor: 'black',
    borderWidth: 3,
  },
  main:{
    width: '100%',
    height: '100%',
    flex: 1,
  }
});