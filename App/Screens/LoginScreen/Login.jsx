import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("./../../../assets/images/login.png")}
          style={styles.loginImage}
        />
        <View style={styles.subContainer}>
          <Text
            style={{
              fontSize: 27,
              color: Colors.WHITE,
              textAlign: "center",
            }}
          >
            Курсовой проект
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              Система заявок для уборки и ремонта{" "}
            </Text>
            Service
          </Text>

          <Text
            style={{
              fontSize: 17,
              color: Colors.WHITE,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Лучшее приложение для поиска мастеров, готовых предоставить вам профессиональную 
            услугу
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
          >
            <Text
              style={{
                fontSize: 17,
                textAlign: "center",
                color: Colors.PRIMARY,
              }}
            >
              Войти
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: Colors.PRIMARY,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  }, 
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 40 
  }
});