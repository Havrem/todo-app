import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo.png";
import { useState } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function Start() {
  const [activeSelection, setActiveSelection] = useState('login');

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets>
      <Image source={logo} style={styles.logo} />
      <View style={styles.authContainer}>
        <View style={styles.selector}>
          <Pressable style={[styles.selectorBtn, activeSelection == 'login' && styles.active]} onPress={() => setActiveSelection('login')}>
            <Text style={styles.selectorText}>LOGIN</Text>
          </Pressable>
          <Pressable style={[styles.selectorBtn, activeSelection == 'register' && styles.active]} onPress={() => setActiveSelection('register')}>
            <Text style={styles.selectorText}>REGISTER</Text>
          </Pressable>
        </View>
        {activeSelection == 'login' ? <LoginForm/> : <RegisterForm/>}

      </View>                        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    // borderColor: "red",
    // borderWidth: 3,
    gap: 15,
    backgroundColor: "rgb(188, 141, 131)",
  },
  logo: {
    resizeMode: "contain",
    width: 300,
    height: 300/(2011/470),
    // borderColor: "red",
    // borderWidth: 3,
  },
  authContainer: {
    // borderColor: 'red',
    // // borderWidth: 3,
    // height: 1909,
    // width: '90%'
    width: "90%",
  },
  selector: {
    backgroundColor: "rgba(219, 209, 181, 1)",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  selectorBtn: {
    // backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 10
  },
  active: {
    // backgroundColor: 'pink',
    borderBottomColor: 'white',
    borderBottomWidth: 3
  },
  selectorText: {
    fontFamily: 'Glory-Bold',
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.51)',
    textAlign: 'center'
  }
});
