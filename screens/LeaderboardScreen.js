import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'





const LeaderboardScreen = () => {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "Firestore")
  useEffect(()=>{
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
      console.log(users)
    }
    getUsers()
  }, [users])
  

  return(
    <View>
        <Text></Text>
          
    </View>
  )
}

export default LeaderboardScreen