import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text} from 'react-native';
import { useFocusEffect } from '@react-navigation/core';



export default function MenuTables({route, navigation}) {

  const setTable = () =>{
    tableInfo[route.params.Nomer] = {price: route.params.Price, key: route.params.Key, order: route.params.Order}
    console.log("setup")
  }
  useFocusEffect( React.useCallback(() => {
    setTable()
  }))
    const [tableInfo, setTableInfo] = (useState([
        {price: 0, key: '0', order: []},
        {price: 0, key: '1', order: []},
        {price: 0, key: '2', order: []},
        {price: 0, key: '3', order: []},
        {price: 0, key: '4', order: []},
        {price: 0, key: '5', order: []}
    ]))
    
    return (
      <View>
          <Button title="1 столик" onPress={() => navigation.navigate("Schet",{
            Nomer: 1, Price: tableInfo[1].price, Key: tableInfo[1].key, Order: tableInfo[1].order
          })} />
          <Text>Счет: {tableInfo[1].price}</Text>
          <Button title="2 столик" onPress={() => navigation.navigate("Schet",{
            Nomer: 2, Price: tableInfo[2].price, Key: tableInfo[2].key, Order: tableInfo[2].order
          })} />
          <Text>Счет: {tableInfo[2].price}</Text>
          <Button title="3 столик" onPress={() => navigation.navigate("Schet",{
            Nomer: 3, Price: tableInfo[3].price, Key: tableInfo[3].key, Order: tableInfo[3].order
          })} />
          <Text>Счет: {tableInfo[3].price}</Text>
          <Button title="4 столик" onPress={() => navigation.navigate("Schet",{
            Nomer: 4, Price: tableInfo[4].price, Key: tableInfo[4].key, Order: tableInfo[4].order
          })} />
          <Text>Счет: {tableInfo[4].price}</Text>
          <Button title="5 столик" onPress={() => navigation.navigate("Schet",{
            Nomer: 5, Price: tableInfo[5].price, Key: tableInfo[5].key, Order: tableInfo[5].order
          })} />
          <Text>Счет: {tableInfo[5].price}</Text>
          <Button title="TEST" onPress={setTable}/>
      </View>
    );
  }