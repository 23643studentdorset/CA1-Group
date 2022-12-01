import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import CustomButton from '../components/CustomButton'
import CustomButton2 from '../components/CustomButton2'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       const uid = user.uid;
       navigation.replace("Home")
      } else {
        // User is signed out
      }
    })
    return unsubscribe
  }, [])


  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // registered
      const user = userCredential.user;
      console.log('Resgistered with:', user.email)
      //
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error code:', errorCode)
    console.log('Error message:', errorMessage)
    });
  }

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Logged in with:', user.email)
      //
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error code:', errorCode)
    console.log('Error message:', errorMessage)
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value= {email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
         <TextInput
          placeholder="Password"
          value= {password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />       
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
        onPress={handleSignin}
        name='Login'
        />
        <CustomButton2
        onPress={handleSignin}
        name='Register'
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer:{
    width: '80%',
  },
  input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
})