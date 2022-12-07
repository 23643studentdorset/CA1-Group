import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'

const LeaderboardScreen = () => {
  
  //grab users from firestore
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
    <View style={styles.container2}>
        <FlatList
        data={users}
        renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.text}>Name: <Text style={styles.text2}>{item.name}</Text></Text>
          <Text style={styles.text}>User ID: <Text style={styles.text2}>{item.id}</Text></Text>
          <Text style={styles.text}>Course: <Text style={styles.text2}>{item.course}</Text></Text>
          <Text style={styles.text}>Year: <Text style={styles.text2}>{item.year}</Text></Text>
          <Text style={styles.text}>Score: <Text style={styles.text2}>{item.score}</Text></Text>
        </View>
        )}
        />  
    </View>
  )
}

export default LeaderboardScreen

const styles = StyleSheet.create({
  container:{
    width: '100%',
    flex:1,
    justifyContent: 'center',
    alignItems:'flex-start',
    paddingBottom:5,
    paddingHorizontal:5,
    borderColor: '#0782F9',
    borderWidth: 3,
    borderRadius:20,
    marginVertical: 3,
  },
  container2:{
    width: '100%',
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
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
})