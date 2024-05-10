import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import loginBg from './../../assets/log.jpg'
import Colors from '../../utils/Colors'
import {client} from './../../utils/KindeConfig'
import services from './../../utils/services'
import { useRouter } from 'expo-router'

export default function LoginScreen() {

  const router = useRouter();
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image source={loginBg} style={styles.bgImage} />
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          height: "100%",
          padding: 20,
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Personal Budget Planner
        </Text>
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 18,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Stay on Track, Event by Event: Your Personal Budget Planner App!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={{textAlign:'center',color:Colors.PRIMARY}}>Login/SignUp</Text>
        </TouchableOpacity>
        <Text style={{fontSize:10,color:Colors.GRAY,marginTop:10}}>* By login/signup you will agree to our terms and conditions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage:{
    width:'100%',
    height:'35%',
    marginTop:30,
    borderWidth:5,
    borderRadius:20
  },
  button:{
    backgroundColor:Colors.WHITE,
    width:'100%',
    padding:15,
    borderRadius:10,
    marginTop:30,
    alignItems:'center'
  }
})