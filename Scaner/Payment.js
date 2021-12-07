import React, {useState} from 'react';
import { FlatList, StyleSheet, View, Text, Modal, Button, ActivityIndicator, Date, TextInput} from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default function Payment({ pay, table, receipt, order, cost }){
    const[payWithCard, setPayWithCard] = useState(false)
    const[cardNumber, setCardNumber] = useState();
    const[cardDate, setDate] = useState({});
    const[cardCVV, setCVV] = useState();
    const addOrder = (article) => {
        console.log(article);
        axios.post('https://sheet.best/api/sheets/ae5a8ddc-c9dc-4fea-90c2-9cdcdaf9713b', article)
      }
      const makeProfile = async(payType) =>{
        const currDate = moment().format("DD | MM | YYYY")
        const currTime = moment().format("HH : mm")
        const ID = Math.random().toString(36).substring(7)
        for(var i = 0; i < order.length; i++)
        {
            const article = { Order: order[i].text, Cost: order[i].cost, Date: currDate, Time: currTime, FullPrice: cost, ID: ID, PayType: payType}
            await addOrder(article)
        }
      }
    const paying = (payType) =>{
        pay(table, receipt)
        makeProfile(payType)
        setPayWithCard(false)
    }
    if(payWithCard)
    {
        return(
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    style={styles.input}
                    placeholder='Номер карты'
                    onChangeText={(text) => setCardNumber(text)}
                    value={cardNumber}
                    keyboardType='number-pad'
                    maxLength={16}
                />               
                <TextInput
                    style={styles.input}
                    placeholder='Date'
                    onChangeText={(text) => setDate(text)}
                    value={cardDate}
                    maxLength={5}
                />
                <TextInput
                    style={styles.input}
                    placeholder='CVV'
                    onChangeText={(text) => setCVV(text)}
                    value={cardCVV}
                    keyboardType='number-pad'
                    maxLength={3}
                />
                <Button title="Оплатить" onPress={()=> paying("Карта")} />
            </View>
        );
    }else{
        return(
            <View>
                <Button title="Оплатить наличными" onPress={()=> paying("Наличные")} />
                <Button title="Оплатить картой" onPress={()=> setPayWithCard(true)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
      marginBottom: 15,
      marginTop: 15,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      width: 200,
      textAlign: 'center',
      fontSize: 20,
      backgroundColor: 'silver'
    },
});