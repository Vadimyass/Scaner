import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Touchable, View, Button} from 'react-native';

export default function PriceList({el, addHandler }) {
  const cost = parseInt(el[1])
  return (
    <TouchableOpacity style={styles.element} onPress={()=>addHandler(el[0], cost)}>
        <View>
            <Text style={styles.text}>{el[0]}</Text>
            <Text style={styles.text}>{el[1]} грн</Text>
        </View>    
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text:{
        textAlign: 'center',
        fontSize: 20
    },
    element:{
      padding: 20,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        marginTop: 20,
        width: '80%',
        marginLeft: '10%'
    }
});