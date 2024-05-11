import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'

export default function ColorPicker({selectedColor,setSelectedColor}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        marginTop: 20,
      }}
    >
      {Colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[{
            backgroundColor: color,
            width: 30,
            height: 30,
            borderRadius: 50,
          },selectedColor==color&&{borderWidth:4}]}
          onPress={() => 
            setSelectedColor(color)
          }
        ></TouchableOpacity>
      ))}
    </View>
  );
}