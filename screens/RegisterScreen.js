import { useNavigation } from '@react-navigation/native';
import { TextInput, View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import CustomButton from '../components/CustomButton';
import { auth } from '../firebase'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()
    
    const navigate = () => {
        navigation.replace("Login")
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // registered
          const user = userCredential.user;
          console.log('Resgistered with:', user.email)
          navigation.replace("Login")
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
                <CustomButton
                    onPress={handleSignUp}
                    name='Register'
                />
                <CustomButton
                    onPress={navigate}
                    name='Go to Login page'
                />
            
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
  });

