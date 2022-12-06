import { StyleSheet, TextInput, View, Text, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, getDocs, getDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase'





const LeaderboardScreen = () => {
  const [data, setData] = useState()
  
  const docRef = doc(db, "Firestore", "311");
  const docSnap = async () => {
    await getDoc(docRef);
  }
  console.log("Document data:", docSnap);

  return(
    <View>
        
          
    </View>
  )
}

export default LeaderboardScreen