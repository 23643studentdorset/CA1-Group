import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton2 = ({onPress, name}) => {
  return (
    <TouchableOpacity
          onPress={onPress}
          style={styles.buttonOutline}
        >
          <Text style={styles.buttonOutlineText}>{name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    buttonOutline:{
        backgroundColor:'white',
        width:'60%',
        borderColor: '#0782F9',
        borderWidth: 2,
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutlineText:{
        color:'#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
})

export default CustomButton2;
