import * as ExpoSplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { View } from "react-native";

export default function AnimationLottie() {
  ExpoSplashScreen.preventAutoHideAsync();

  const animation = useRef<LottieView>(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <LottieView
          autoPlay={true}
          style={{ width: 800, height: 800 }}
          source={require("../../assets/animations/Screen.json")}
          duration={3000}
          loop={false}
          onAnimationFinish={ExpoSplashScreen.hideAsync}
        />
      </View>
    </>
  );
}
