import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, name}) => {
  return (
    <TouchableOpacity
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    button:{
        backgroundColor:'#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonText:{
        color:'white',
        fontWeight: '700',
        fontSize: 16,
      },
})

export default CustomButton;
