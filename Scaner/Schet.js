import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, View, Text, Modal, Button, ActivityIndicator} from 'react-native';
import ListItem from './ListItem';
import Form from './Form';
import FetchData from './FetchDataPrice';
import { useFocusEffect } from '@react-navigation/core';
import Payment from './Payment';

export default function Schet({FullPrice, Order, setOrder, Price, selectedReceipt, paying, table}) {
  const [listOfItems, setListOfItems] = useState(Order)
  const [openedSchet, setOpenedSchet] = useState(false)
  const [modalWindow, setModalWindow] = useState(false)
  const [fullPrice, setFullPrice] = useState(FullPrice)
  const [price, setPrice] = useState(Price)
  const [data, setData] = useState([]);

  const addHandler = (text, cost) => {
    setListOfItems((list)=>{
      return[
        {text: text, cost: cost, key: Math.random().toString(36).substring(7) },
        ...list
      ]
    })
    setFullPrice(fullPrice+cost)
    setPrice(price+cost)
    setOpenedSchet(false);
  }

  const deleteHandler = (cost, key) => {
    setListOfItems((list)=>{
      return list.filter(listOfItems => listOfItems.key != key)
    });
    setFullPrice(fullPrice-cost)
    setPrice(price-cost)
  }

  const pay = (table, receipt) =>{
    setModalWindow(false)
    paying(table, receipt)
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
  if(!modalWindow){
  return (
    <View>
      {openedSchet ? (
      <View> 
        <Form addHandler={addHandler} priceList={data}/>
      </View>
      ) : (
      <View>
        <Text style={styles.text}>Чек номер: {selectedReceipt+1}</Text>
        <Text style={styles.text}>Сумма всех чеков: {fullPrice}</Text>
        <Text style={styles.text}>Сумма данного чека: {price}</Text>    
        <View>
          <Button title = "Добавить заказ" onPress = {()=>setOpenedSchet(true)}/>
          <FlatList data={listOfItems} renderItem={({item})=>(
            <ListItem el={item} deleteHandler={deleteHandler}/>)} scrollEnabled={true} style={styles.flatlist}/>
          <Button title = "Выставить столу заказ" onPress = {()=>setOrder(fullPrice, listOfItems, price)}/>
          <Button title = "Оплатить чек" onPress = {()=>setModalWindow(true)}/>
        </View>
      </View>
      )} 
      </View> 
  );}
  else{
    return(
      <Payment pay={pay} table={table} receipt={selectedReceipt} order={listOfItems} cost={price}/>
    );
  }
}
const styles = StyleSheet.create({
  text:{
      textAlign: 'center',
      fontSize: 20
  },
  flatlist:{
    width: '100%',
    height: '65%',
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