import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity, Modal} from 'react-native';

export default function Form({table, selectTable, payment}) {

    const [receipts, setReceipts] = useState(table.receipts)
    const [lastReceipt, setLastReceipt] = useState(table.lastReceipt)
    const addHandler = (receipt) => {
        setReceipts((list)=>{
          return[
            ...list,
            {nomer: receipt+1, key: Math.random().toString(36).substring(7), order: [], price: 0}
          ]
        })
        setLastReceipt(receipt+1)
      }
    const Paying = () =>{
      payment(parseInt(table.key))
    }
    return (
        <View style={styles.main}>
            <Button title="test" onPress={()=>Paying()}/>
            <View style={styles.panel}>
                <View style={styles.button}>
                    <Text style={styles.textButton}>{parseInt(table.key)+1}</Text>
                </View>
                <TouchableOpacity style={styles.miniButton} onPress={()=>addHandler(lastReceipt)}>
                    <Text style={styles.textButton}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.smallPanel}>
                <FlatList data={receipts} renderItem={({item})=>(
                    <View>
                        <TouchableOpacity style={styles.receipt} onPress={()=>selectTable(parseInt(table.key), parseInt(item.nomer), receipts, lastReceipt)}>
                            <Text style={styles.textButton}>{parseInt(item.nomer)+1}</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                    scrollEnabled={true}
                    horizontal={true}/>  
            </View>
            <Text>Счет: {table.fullPrice}</Text>
        </View>
    );
  }
const styles = StyleSheet.create({
    main:{
        width: "100%",
        alignItems: 'center'
      },
    panel:{
        justifyContent: 'center',
        flexDirection: 'row'
    },
    receiptsList:{
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    button: {
      width: 80,
      borderRadius: 4,
      backgroundColor: '#14274e',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      zIndex: 2,
      marginBottom: 15,
      marginTop: 15,
      marginRight: 10,
      marginLeft: 10
    },
    miniButton: {
        width: 50,
        borderRadius: 4,
        backgroundColor: '#14274e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        zIndex: 2,
        marginBottom: 15,
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10
      },
    receipt:{
        width: 40,
        borderRadius: 4,
        backgroundColor: '#14274e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        zIndex: 2,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
    },
    textButton:{
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 36
    },
    smallPanel:{
      width: "80%",
      height: 80,
      backgroundColor: '#14274e',
      opacity: 0.5,
      flexDirection: 'row',
      alignItems: 'flex-end'
    }
  })