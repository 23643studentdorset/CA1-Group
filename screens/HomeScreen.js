import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'
import { signOut } from "firebase/auth";
import CustomButton from '../components/CustomButton';
import { collection, doc, setDoc } from "firebase/firestore"; 

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [id, setId] = useState('')
  const [acelerometerData, setAcelerometerData] = useState('')
  const [score, setScore] = useState('')
  const navigation = useNavigation()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      console.log('Error:', error.code)
    });
  }
 
  const handlePress = () =>{
    setAcelerometerData([])
    setScore(1)
    handleData(id, name, course, year, acelerometerData, score)
  }

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
