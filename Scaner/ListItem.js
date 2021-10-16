import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function ListItem({el, deleteHandler }) {
  return (
    <TouchableOpacity style={styles.element} onPress={()=>deleteHandler(el.cost, el.key)}>
        <View>
            <Text style={styles.text}>{el.text} {el.cost} грн</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    text:{
        textAlign: 'center',
        fontSize: 20,
    },
    element:{
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        width: '80%',
        marginLeft: '10%',
        height: 50
    }

});
