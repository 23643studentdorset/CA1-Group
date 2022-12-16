import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'

const LeaderboardScreen = () => {
const [scores, setScores] = useState([])
const [leaderboardData, setLearderboarData] = useState([])
const [singleScore, setSingleScore] = useState(0)
let i = 0

  //grab users from firestore
  const [users, setUsers] = useState([])
  //const usersCollectionRef = collection(db, "Firestore")
  const usersCollectionRef = collection(db, "Users")
  
  useEffect(()=>{
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc)=> ({...doc.data(), id: doc.id})) 
      setUsers(users)      
      //console.log(users)
      const leaderboardData = users.map((n)=> n.accelerometer_data);
      setLearderboarData(leaderboardData);
      //console.log(leaderboardData)
      setScores([])
      
      leaderboardData.forEach(arrayElement => {
        //console.log(arrayElement)
        let score = 0       
        if (arrayElement.length === 1000){
          //console.log("I'm here")
          arrayElement.forEach(objectElement => {
            //console.log(objectElement)
            score += calculateScore(objectElement)
            //setSingleScore(singleScore + calculateScore(objectElement))
          });
        score = score/1000
        setSingleScore(score)
        //console.log("score:" + score)
        console.log(users[i])
        users[i].score = score
        scores.push(score);
        i++  
        }else {
          users[i].score = -1
          scores.push (-1)
          i++  
        }          
      });
        console.log("scores " + scores)
        //sortUsersByScore()  
        //console.log(users)
        //sendScores()
        
    }
    
    getUsers()
    //putScoresInUsers()
  }, [])

  function sortUsersByScore(){
    users.sort((a, b) => {
      return b.age - a.age;
  });
  
    //console.log("users:" + users) 
  }
  function calculateScore(object){
    const calculate = Math.abs(object.x) + Math.abs(object.y) + Math.abs(object.z)
    return calculate
  }
 function sendScores() {
    for (let i = 0; i < users.length; i++) {
      //console.log("scores: " + scores[i])
      sendScoreData(users[i].id, scores[i])
    }
  }
   async function sendScoreData(id, score){
      await updateDoc(doc(db, "Users", id), {
    //await updateDoc(doc(db, "Firestore", id), {   
       score: Number(score),
     });
   }
  // const putScoresInUsers = () => { 
  //   for (let i = 0; i < users.length; i++) {
  //     users[i].score = scores[i]
  //   }
  //   console.log("users:" + users[0].score)
  // }
  
  return(
    <View style={styles.container2}>
        <FlatList
        data={users}
        renderItem={({item}) => (
        <View style={styles.container}>
          <Text style={styles.text}>Name: <Text style={styles.text2}>{item.name}</Text></Text>
          <Text style={styles.text}>User ID: <Text style={styles.text2}>{item.id}</Text></Text>
          <Text style={styles.text}>Course: <Text style={styles.text2}>{item.course}</Text></Text>
          <Text style={styles.text}>Year: <Text style={styles.text2}>{item.year}</Text></Text>
          <Text style={styles.text}>Score: <Text style={styles.text2}>{item.score == -1 ? NaN : item.score}</Text></Text>
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