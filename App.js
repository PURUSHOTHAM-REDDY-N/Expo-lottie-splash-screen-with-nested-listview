import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState,useEffect } from 'react';
import AnimationLottie from './src/components/AnimationLottie';
import * as ExpoSplashScreen from "expo-splash-screen";
import NestedListViewComponent from './src/components/NestedListViewComponent';
import { SafeAreaView } from 'react-native'


export default function App() {
  ExpoSplashScreen.hideAsync();

  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {

    setTimeout(()=>{
      setIsLoading(false)
    },3000)
    
  },[]);

  if(isLoading){
    return(
      <AnimationLottie/>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

    {/* <View style={styles.container}>
      <NestedListViewComponent/>
      <StatusBar style="auto" />
    </View> */}
    <NestedListViewComponent/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
