import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'
import { signOut, getAuth} from "firebase/auth";
import CustomButton from '../components/CustomButton';
import { doc, setDoc, updateDoc  } from "firebase/firestore"; 
import { Accelerometer } from 'expo-sensors';

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState()
  const [id, setId] = useState('')
  const [score, setScore] = useState()
  const [preScore, setPreScore] = useState(0)
  const navigation = useNavigation()
  
  //set initial values
  useEffect(()=>{
    setAccelometerArray([])
    setAccelerometerCounter(0)
    setScore(0)
    Accelerometer.addListener(setAccelerometerData);
    Accelerometer.setUpdateInterval(200)
  }, [])

  //Accelerometer
  const [accelerometerData, setAccelerometerData] = useState({x: 0, y: 0, z: 0,})
  const [accelerometerCounter, setAccelerometerCounter] = useState(0)
  const [accelerometerArray, setAccelometerArray] = useState([])
  
  useEffect(()=>{
    setAccelerometerCounter(accelerometerCounter + 1)
    setAccelometerArray(current => [...current, accelerometerData]);
    setPreScore(preScore + calculateScore())
    if (accelerometerCounter === 1000 && id != '')
    {
      setScore(preScore/accelerometerCounter)
      console.log(Score)
      sendAccelometerData(accelerometerArray, score, id)
      setAccelerometerCounter(0)
      setAccelometerArray([])
      setScore(0)
    }    
  }, [accelerometerData]);

  async function sendAccelometerData(accelerometer_data, score, id){
    await updateDoc(doc(db, "Firebase", id), {
      accelerometer_data: accelerometer_data,
      score: score
    });
  }

  //score calculation
  function calculateScore(){
    return Math.abs(accelerometerData.x) + Math.abs(accelerometerData.y) + Math.abs(accelerometerData.z)
  }

  //button handlers
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      console.log('Error:', error.code)
    });
  }
 
  const handlePress = () =>{
    handleData(id, name, course, year, [], score)
  }

  //send info to firebase
  async function handleData(id, name, course, year, accelerometer_data, score) {
    await setDoc(doc(db, "Firebase", id), {
      name: name, 
      course: course, 
      year: Number(year),
      accelerometer_data: accelerometer_data, 
      score: Number(score),
    });
  }
  
  return (
        <View style={styles.container}>
          <Text style={styles.text}>counter: {accelerometerCounter}</Text>
          <Text style={styles.text}></Text>
          <View style={styles.buttonContainer}>        
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
        <CustomButton 
          onPress={navigation.replace("Login")}
          name= 'Leader board'
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
