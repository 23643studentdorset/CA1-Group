import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'
import { signOut, getAuth} from "firebase/auth";
import CustomButton from '../components/CustomButton';
import { doc, setDoc, updateDoc, collection, getDoc, DocumentSnapshot  } from "firebase/firestore"; 
import { Accelerometer } from 'expo-sensors';

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState()
  const [id, setId] = useState('')
  const [score, setScore] = useState()
  const [preScore, setPreScore] = useState(0)
  const navigation = useNavigation()
  const docRef = doc(db, "Users", "23643")
  
  //Grab and write user info after login
  useEffect(()=>{
    const getUser = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        console.log(docSnap.data())
        setId("23643")
        setName(docSnap.data().name)
        setCourse(docSnap.data().course)
        setYear(docSnap.data().year)
      } else {
        console.log("No such document!");
      }
    }
    getUser()
  }, [name, course, year, id ])

  //set initial accelerometer values
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
    setScore(preScore/accelerometerCounter)
    
    if (accelerometerCounter === 1000 && id != '' && accelerometerArray.length === 1000)
    {
      //console.log(score)
      sendAccelometerData(id, name, course, year, accelerometerArray, 0)
      setAccelerometerCounter(0)
      setAccelometerArray([])
      setScore(0)
      setPreScore(0)
    }    
  }, [accelerometerData]);

  async function sendAccelometerData(id, name, course, year, accelerometer_data, score){
    await setDoc(doc(db, "Users", id), {
      name: name,
      course: course, 
      year: Number(year),
      accelerometer_data: accelerometer_data, 
      //score: Number(score),
    });
  }

  // //score calculation
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
 
  const goToScreen = (screen) =>{
    navigation.navigate(screen)
  }

  return (
        <View style={styles.container}>
          <Text style={styles.textHeading}>Welcome! {name}</Text>
          <Text style={styles.text}>Counter: <Text style={styles.text2}>{accelerometerCounter}</Text></Text>
          <Text style={styles.text}>Student id: <Text style={styles.text2}>{id}</Text></Text>
          <Text style={styles.text}>Course: <Text style={styles.text2}>{course}</Text></Text>
          <Text style={styles.text}>Year: <Text style={styles.text2}>{year}</Text></Text>
          
        <CustomButton
          onPress={handleSignOut}
          name='Sign out'
          />
        <CustomButton 
          onPress={()=>{goToScreen("Leaderboard")}}
          name= 'Leaderboard'
        />
         <CustomButton 
          onPress={()=>{goToScreen("UserInfo")}}
          name= 'User info'
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
  input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '80%',
  },
  text:{
    fontSize: 16,
    color:'#0782F9',
    paddingBottom:3,
    fontWeight: "800"
  },
  text2:{
    fontSize: 16,
    color:'#000',
    paddingBottom:3,
    fontWeight: "800"
  },
  textHeading:{
    fontSize: 33,
    color:'#0782F9',
    paddingBottom:10,
    fontWeight: "800"
  },
})
