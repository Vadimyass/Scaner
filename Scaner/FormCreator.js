import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import BarcodeMask from 'react-native-barcode-mask';
import axios from 'axios';
import firebase from 'firebase'
require("firebase/firebase-storage")

export default function FormCreator({ route, navigation }) {
    

  const submitPost = async (image) => {
    console.log(image)
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    // Create a ref in Firebase (I'm using my user's ID)
    const ref = firebase.storage().ref().child(`avatars/${route.params.ID}`);

    // Upload blob to Firebase
    const snapshot = await ref.put(blob, { contentType: "image/png" });

    // Create a download URL
    const remoteURL = await snapshot.ref.getDownloadURL();
    // Return the URL
    setImage(remoteURL)
  }
  
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }else{
              console.log("have access")
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
    
    
        if (!result.cancelled) {
          console.log(result.uri)
          submitPost(result.uri);
        }
      };

    const [name, setName] = useState();
    const [cost, setCost] = useState();
    const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/scanner-react-native.appspot.com/o/emptyPhoto.jpg?alt=media&token=ff2ab309-10b8-4ee1-9386-e71ffc5094e1');

    const addUser = (article) => {
      console.log(article);
      axios.post('https://sheet.best/api/sheets/74a2c736-b2ad-470e-b364-a890f0123d1d', article)
    }
    const makeProfile = async() =>{
      const article = {Nomer: route.params.Nomer, Name: name, Cost: cost, ID: route.params.ID, Avatar: image}
      await addUser(article)
      navigation.navigate('Main')
    }

    const [startCamera, setStartCamera] = useState(false);
    const [cameraRef, setCamera] = useState(null);

    const __startCamera = async () => {
      const { status } = await Camera.requestPermissionsAsync()
      if (status === 'granted') {
        setStartCamera(true)
      } else {
        Alert.alert('Access denied')
      }
    }

    const __takePicture = async () => {
      if (!cameraRef) return
      const photo = await cameraRef.takePictureAsync()
      console.log(photo.uri)
      console.log(photo)
      submitPost(photo.uri)
      setStartCamera(false)
    }
    return (
      <View style={styles.container}>
      {startCamera ? (
        <View style={styles.container}>
          <Camera style={styles.camera} ref={ref => { setCamera(ref); }}>
            <TouchableOpacity style={styles.button} onPress={()=>setStartCamera(false)}>
              <Text style={styles.textButton}>Закрыть</Text>
            </TouchableOpacity>
            <BarcodeMask edgeColor="#62B1F6" height={300} width={300} showAnimatedLine={false}/>
            <TouchableOpacity style={styles.button} onPress={__takePicture}>
              <Text style={styles.textButton}>Сделать фото</Text>
            </TouchableOpacity>
          </Camera>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{fontSize: 20, textAlign: 'center', color:'black', marginBottom: 15}}>Форма редактирования клиентов</Text>
          <Image source={{ uri: image }} style={{ width: 200, height: 200, borderWidth: 3, borderColor: 'black', borderRadius: 5 }} />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.textButton}>Галерея</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={__startCamera}>
              <Text style={styles.textButton}>Камера</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder='ФИО'
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder='Стоимость заказов'
            onChangeText={(text) => setCost(text)}
            value={cost}
          />
          <Text style={styles.text}>ID: {route.params.ID}</Text>
          <TouchableOpacity style={styles.button} onPress={makeProfile}>
            <Text style={styles.textButton}>Добавить</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
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
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'black',
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end'
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
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10
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