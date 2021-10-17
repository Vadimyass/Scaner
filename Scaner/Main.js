import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Modal, Dimensions, Image, TouchableOpacity, AppState } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchData from './FetchData';

export default function Main({navigation}) {

  const [clientModalWindow, setClientModalWindow] = useState(false);

  const [startCamera,setStartCamera] = useState(false);

  const [data, setData] = useState([]);

  const [client, setClient] = useState([1, 1, 1, 1, './assets/emptyPhoto.jpg']);

  const [tableInfo, setTableInfo] = useState([])

  const __startCamera = async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  let value = async () => {
    setData(await FetchData());
  };
  const checkTables = async() =>{
    try{
      var settings = await AsyncStorage.getItem('tableinfo')
      if(settings != null){
        console.log("found tableinfo")
        console.log(settings)
        setTableInfo(settings)
      }
    }
    catch(e){ 
      console.log("not found tableinfo")
      try{
        const jsonValue = JSON.stringify({Nomer: 0, Price: 0, Key: '0', Order: 0})
        setTableInfo(jsonValue)
        await AsyncStorage.setItem('tableinfo', jsonValue)
      }
      catch(e){
      }
    }
  }

  useFocusEffect( React.useCallback(() => {
    value();
    checkTables();
    console.log(tableInfo)
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

  const testID = (type, ID) =>{
      if(data.find(item => item[3] === ID) === undefined){
        navigation.navigate('Creator', {
          ID: ID, Nomer: data.length
        })
        setStartCamera(false)
      }else{
        var user = data.find(item => item[3] === ID)
        setClient(user)
        setClientModalWindow(true)
        setStartCamera(false)      
      }
  }
  const goToRedact = () => {
    setClientModalWindow(false)
    navigation.navigate('Redactor', {
      Nomer: client[0], Name: client[1], Cost: client[2], ID: client[3],  Image: client[4]
   } )
  }
  return (
    <View style={styles.container}>
      <Modal visible={clientModalWindow}>
        <View style={styles.info}>
          <TouchableOpacity style={styles.button} onPress={() => setClientModalWindow(false)}>
            <Text style={styles.textButton}>Закрыть</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Информация о клиенте</Text>
          <Image style={{width: 200, height: 200, borderWidth: 3, borderColor: 'black', borderRadius: 5,}} source={{uri: client[4]}}/>
          <Text style={styles.text}>ФИО: {client[1]}</Text>
          <Text style={styles.text}>Сумма счета: {client[2]}</Text>
          <Text style={styles.text}>ID: {client[3]}</Text>
          <TouchableOpacity style={styles.button} onPress={goToRedact}>
            <Text style={styles.textButton}>Редактировать</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {startCamera ? (
            <BarCodeScanner
              onBarCodeScanned={(scan) => testID(scan.type, scan.data)}
              style={styles.scan}>
              <TouchableOpacity style={styles.button} onPress={()=>setStartCamera(false)}>
                <Text style={styles.textButton}>Закрыть</Text>
              </TouchableOpacity>
              <BarcodeMask edgeColor="#62B1F6" showAnimatedLine height={150}/>
            </BarCodeScanner>      
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={__startCamera}>
            <Text style={styles.textButton}>Просканировать</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MenuTables', tableInfo)}>
            <Text style={styles.textButton}>Меню столов</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:  '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  info:{
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'grey'
  },
  scan: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'black',
    zIndex: 1,
    alignItems: 'center'
  },
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
    marginTop: 15
  },
  textButton:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text:{
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15
  }
});