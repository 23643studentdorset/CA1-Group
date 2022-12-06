import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'
import { signOut, getAuth} from "firebase/auth";
import CustomButton from '../components/CustomButton';
import { collection, getDocs  } from "firebase/firestore"; 
import { Accelerometer } from 'expo-sensors';


const LeaderboardScreen = () => {
    const querySnapshot = async () => {await getDocs(collection(db, "Firebase"))};
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    return(
        <>
        </>
    )
}

export default LeaderboardScreen