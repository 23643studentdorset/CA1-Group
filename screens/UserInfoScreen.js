import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase'
import CustomButton from '../components/CustomButton';
import { doc, setDoc, deleteDoc, getDoc} from "firebase/firestore"; 
import { StyleSheet, TextInput, View, Text } from 'react-native'


const UserInfoScreen = () => {
    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [year, setYear] = useState()
    const [id, setId] = useState('')
    const [userId, setUserId] = useState()
    const [oldUserIdFirestore, setOldUserIdFirestore] = useState()
    const navigation = useNavigation()
    const docRef = doc(db, "UsersData", auth.currentUser.uid)
    
    useEffect (()=>{
        setUserId(auth.currentUser.uid)
        //console.log(userId)
    }, [userId])

    useEffect(()=>{
        const getUser = async () => {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()){
            setOldUserIdFirestore(docSnap.data().studentId)
            console.log(oldUserIdFirestore)
          } else {
            console.log("No such document!");
          }
        }
        getUser()
      }, [])

    const pressHandler = () =>{
        deleteUser(oldUserIdFirestore)
        handleData(id, name, course, year)        
    }


    //send info to firebase
    async function handleData(studentId, name, course, year) {
        await setDoc(doc(db, "UsersData", userId), {
        name: name, 
        course: course, 
        year: Number(year),
        studentId: studentId
        });
    }

    const deleteUser = async (idToDelete) => {
        const userDoc = doc(db,"Firestore", idToDelete)
        await deleteDoc(userDoc)
    }
    
    
    return(
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
                value={id}
                onChangeText={text => setId(text)}
                style={styles.input}
            />
            <CustomButton
                onPress={pressHandler}
                name='Update your data'
            />
            <CustomButton
                onPress={()=>{navigation.navigate("Home")}}
                name='Home'
            />
        </View>
    )
}

export default UserInfoScreen

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
  })
  