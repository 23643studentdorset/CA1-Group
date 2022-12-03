import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'
import { signOut } from "firebase/auth";
import CustomButton from '../components/CustomButton';
import { doc, setDoc } from "firebase/firestore"; 
import { Accelerometer } from 'expo-sensors';

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [id, setId] = useState('')
  const [score, setScore] = useState('')
  const navigation = useNavigation()

  //acelerometer
  const [{ x, y, z }, setAcelerometerData] = useState({x: 0, y: 0, z: 0,});
  const [subscription, setSubscription] = useState(null);
  const _fast = () => Accelerometer.setUpdateInterval(200)
  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(setAcelerometerData)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);



  //button handlers
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      console.log('Error:', error.code)
    });
  }
 
  const handlePress = () =>{
    setAcelerometerData({})
    setScore(1)
    handleData(id, name, course, year, acelerometerData, score)
  }

  //send info to firebase
  async function handleData(id, name, course, year, acelerometerData, score) {
    await setDoc(doc(db, "Firebase", id), {
      name: name, 
      course: course, 
      year: Number(year),
      acelerometerData: acelerometerData, 
      score: Number(score),
    });
  }
  return (
    <View style={styles.container}>
        
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
        
        
        <TextInput
          placeholder="Name"
          value= {name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="course"
          value= {course}
          onChangeText={text => setCourse(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Year"
          value= {year}
          onChangeText={text => setYear(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="student ID"
          value= {id}
          onChangeText={text => setId(text)}
          style={styles.input}
        />

      <CustomButton
        onPress={handleSignOut}
        name='Sign out'
        />
      <CustomButton
        onPress={handlePress}
        name='Send data'
      />
    </View>
  )
}


export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },
  button:{
    backgroundColor:'#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:40,
  },
  buttonText:{
    color:'white',
    fontWeight: '700',
    fontSize: 16,
  },
  input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '80%',
  },
})
