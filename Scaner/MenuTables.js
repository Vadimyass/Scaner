import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import Schet from './Schet'


export default function MenuTables({route, navigation}) {

  const [modalWindow, setModalWindow] = useState(false)

  const setOrder = (Price, Order) =>{
    tableInfo[selectedTable] = {price: Price, key: tableInfo[selectedTable].key, order: Order}
    console.log("setup")
    setModalWindow(false)
  }

    const[selectedTable, setSelectedTable] = useState(0)

    const selectTable = (number) =>{
      setSelectedTable(number)
      console.log("Выбран стол номер ", number+1)
      setModalWindow(true)
    }
    const [tableInfo, setTableInfo] = (useState([
        {price: 0, key: '0', order: []},
        {price: 0, key: '1', order: []},
        {price: 0, key: '2', order: []},
        {price: 0, key: '3', order: []},
        {price: 0, key: '4', order: []}
    ]))


    return (
      <View>
        <Modal visible={modalWindow}>
          <View style={styles.info}>
            <Schet Price={tableInfo[selectedTable].price} Order={tableInfo[selectedTable].order} setOrder={setOrder}/>
          </View>
        </Modal>
        <View>
          <FlatList data={tableInfo} renderItem={({item})=>(
            <View>
              <TouchableOpacity style={styles.button} onPress={()=>selectTable(parseInt(item.key))}>
                <Text style={styles.textButton}>{parseInt(item.key)+1} столик</Text>
              </TouchableOpacity>
              <Text>Счет: {item.price}</Text>
            </View>
          )}
          scrollEnabled={true}/>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  button: {
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    zIndex: 2,
    marginBottom: 15,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10
  },
  textButton:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})