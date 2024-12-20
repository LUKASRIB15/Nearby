import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Splash } from "@/components/splash";
import { Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold, useFonts } from "@expo-google-fonts/rubik";
import "../global.css"

//SplashScreen.preventAutoHideAsync()

export default function Layout(){
  const [doesFontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold
  })

  const [appIsReady, setAppIsReady] = useState(false)

  
  useEffect(()=>{
    async function prepareApp(){
      if(doesFontsLoaded){
        await new Promise((resolve)=> setTimeout(resolve, 2000))
        setAppIsReady(true)
      }
    }
    
    prepareApp()
    
  }, [doesFontsLoaded])
  
  if(!appIsReady){
    return <Splash />
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      />
      <StatusBar backgroundColor="transparent" style="auto" translucent/>
    </GestureHandlerRootView>
  )
}