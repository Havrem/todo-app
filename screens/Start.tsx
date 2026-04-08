import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import logo from "../assets/logo.png";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/constants/themes";

export default function Start() {
  const { t } = useTranslation('start');
  const [activeSelection, setActiveSelection] = useState('login');

  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets>
      <Image source={logo} style={styles.logo} />
      <View style={styles.authContainer}>
        <View style={styles.selector}>
          <Pressable style={[styles.selectorBtn, activeSelection == 'login' && styles.active]} onPress={() => setActiveSelection('login')}>
            <Text style={styles.selectorText}>{t('login')}</Text>
          </Pressable>
          <Pressable style={[styles.selectorBtn, activeSelection == 'register' && styles.active]} onPress={() => setActiveSelection('register')}>
            <Text style={styles.selectorText}>{t('register')}</Text>
          </Pressable>
        </View>
        {activeSelection == 'login' ? <LoginForm/> : <RegisterForm/>}

      </View>                        
    </ScrollView>
  );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
      container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 15,
        backgroundColor: t.colors.background,
      },
      logo: {
        resizeMode: "contain",
        width: 300,
        height: 300/(2011/470),
      },
      authContainer: {
        width: "90%",
      },
      selector: {
        backgroundColor: t.colors.frame,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      },
      selectorBtn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        marginHorizontal: 10
      },
      active: {
        borderBottomColor: 'white',
        borderBottomWidth: 3
      },
      selectorText: {
        fontFamily: 'Glory-Bold',
        fontSize: 17,
        color: 'rgba(0, 0, 0, 0.51)',
        textAlign: 'center'
      }
    })
}
