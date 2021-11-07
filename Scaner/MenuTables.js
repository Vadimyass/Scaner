import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import Schet from './Schet'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
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

  //useFocusEffect( React.useCallback(() => {
  //  setTables();
  //}, []));

  const setOrder = async(fullPrice, Order, Price) =>{
    console.log("net")
    tableInfo[selectedTable].receipts[selectedReceipt].price = Price
    tableInfo[selectedTable].receipts[selectedReceipt].order = Order
    tableInfo[selectedTable].fullPrice = fullPrice
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
    const[selectedReceiptModal, setSelectedReceiptModal] = useState(0)

    const selectTable = (table, recNomer, receipts, lastReceipt) =>{
      setSelectedTable(table)
      setSelectedReceipt(recNomer)
      console.log("Выбран стол номер ", table+1, "  Чек номер ", recNomer+1)
      tableInfo[selectedTable].receipts = receipts
      tableInfo[selectedTable].lastReceipt = lastReceipt
      setSelectedReceiptModal(selectedReceipt)
      setModalWindow(true)
    }
    const [tableInfo, setTableInfo] = (useState([
        {fullPrice: 0, key: '0', lastReceipt: 0, receipts: [{nomer: 0, key: "54tr4ty", order: [], price: 0}]},
        {fullPrice: 0, key: '1', lastReceipt: 0, receipts: [{nomer: 0, key: "14tr4ty", order: [], price: 0}]},
        {fullPrice: 0, key: '2', lastReceipt: 0, receipts: [{nomer: 0, key: "24tr4ty", order: [], price: 0}]},
        {fullPrice: 0, key: '3', lastReceipt: 0, receipts: [{nomer: 0, key: "34tr4ty", order: [], price: 0}]},
        {fullPrice: 0, key: '4', lastReceipt: 0, receipts: [{nomer: 0, key: "44tr4ty", order: [], price: 0}]},
    ]))

    const payment = async (nomer) => {
      tableInfo[nomer].receipts = [{nomer: 0, key: Math.random().toString(36).substring(7), order: [], price: 0}]
      tableInfo[nomer].fullPrice = 0
      tableInfo[nomer].lastReceipt = 0
      try{
        await AsyncStorage.setItem("tableinfo", JSON.stringify(tableInfo))
        console.log("set tableinfo")
      }
      catch(e){
        console.log(e)
      }
    }
    const [loading, setLoading] = useState(true)
    if(!loading){
      return (
        <View>
          {modalWindow ? (
            <View style={styles.list}>
              <Schet fullPrice ={tableInfo[selectedTable].fullPrice} 
                    Price={tableInfo[selectedTable].receipts[selectedReceipt].price} 
                    Order={tableInfo[selectedTable].receipts[selectedReceipt].order} 
                    setOrder={setOrder}
                    selectedReceipt={selectedReceipt}
                    FullPrice={tableInfo[selectedTable].fullPrice}/>
            </View>   
          ) : (
            <View style={styles.list}>
            <FlatList data={tableInfo} renderItem={({item})=>(
              <Table table={item} selectTable={selectTable} payment={payment}/>
            )}
            scrollEnabled={true}/>
          </View>
          )}
        </View>
      );
    }else{
      return(
        <AppLoading 
          startAsync={setTables} 
          onFinish={()=>setLoading(false)}
          onError={console.warn}
        />
      );
    }
  }

const styles = StyleSheet.create({
  main:{
    alignItems: 'center'
  },
  list:{
    width: "100%"
  }
})