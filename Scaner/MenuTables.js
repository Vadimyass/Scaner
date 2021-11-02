import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import Schet from './Schet'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import Table from './Table.js'

export default function MenuTables({route, navigation}) {

  const [modalWindow, setModalWindow] = useState(false)

  const setTables = async() =>{
    try{
      var settings = await AsyncStorage.getItem('tableinfo')
      if(settings != null){
        console.log("found tableinfo")
        console.log(settings)
        const parsedSettings = JSON.parse(settings)
        setTableInfo(parsedSettings)
      }
    }
    catch(e){ 
      console.log("not found tableinfo")
      }
  }

  useFocusEffect( React.useCallback(() => {
    setTables();
  }, []));

  const setOrder = async(Price, Order) =>{
    tableInfo[selectedTable].price = Price
    tableInfo[selectedTable].order[selectedReceipt] = Order
    try{
      await AsyncStorage.setItem("tableinfo", JSON.stringify(tableInfo))
      console.log("set tableinfo")
    }
    catch(e){
      console.log(e)
    }
    console.log("setup")
    setModalWindow(false)
  }

    const[selectedTable, setSelectedTable] = useState(0)
    const[selectedReceipt, setSelectedReceipt] = useState(0)

    const selectTable = (table, receipt) =>{
      setSelectedTable(table)
      setSelectedReceipt(receipt)
      console.log("Выбран стол номер ", table+1, "  Чек номер ", receipt+1)
      setModalWindow(true)
    }
    const [tableInfo, setTableInfo] = (useState([
        {price: 0, key: '0', order: [[],[],[],[],[]]},
        {price: 0, key: '1', order: [[],[],[],[],[]]},
        {price: 0, key: '2', order: [[],[],[],[],[]]},
        {price: 0, key: '3', order: [[],[],[],[],[]]},
        {price: 0, key: '4', order: [[],[],[],[],[]]}
    ]))

    const payment = async (nomer) => {
      tableInfo[nomer].order = [[],[],[],[],[]]
      tableInfo[nomer].price = 0
      try{
        await AsyncStorage.setItem("tableinfo", JSON.stringify(tableInfo))
        console.log("set tableinfo")
      }
      catch(e){
        console.log(e)
      }
    }

    return (
      <View style={styles.main}>
        <Modal visible={modalWindow}>
          <View style={styles.list}>
            <Schet Price={tableInfo[selectedTable].price} Order={tableInfo[selectedTable].order[selectedReceipt]} setOrder={setOrder}/>
          </View>
        </Modal>
        <View style={styles.list}>
          <FlatList data={tableInfo} renderItem={({item})=>(
            <Table table={item} selectTable={selectTable} payment={payment}/>
          )}
          scrollEnabled={true}/>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  main:{
    alignItems: 'center'
  },
  list:{
    width: "100%"
  }
})