import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'
import { signOut } from "firebase/auth";
import CustomButton from '../components/CustomButton';



const HomeScreen = () => {

  const navigation = useNavigation()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      console.log('Error:', error.code)
    });
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <CustomButton
        onPress={handleSignOut}
        name='Sign out'
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
})