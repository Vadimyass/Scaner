import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList} from 'react-native';
import PriceList from './PriceList';

export default function Form({addHandler, priceList}) {
  return (
    <View>
        <FlatList data={priceList} renderItem={({item})=>(
            <PriceList el={item} addHandler={addHandler}/>
        )}
        keyExtractor={(item) => item[2]}
        scrollEnabled={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
    main:{
        width: '100%',
        height: '100%',
        flex: 1,
      }
});