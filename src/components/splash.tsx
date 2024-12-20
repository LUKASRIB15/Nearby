import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Image, View } from "react-native";

export function Splash(){
  return (
    <View style={{backgroundColor: "#257F49",flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Image source={require("@/../assets/images/splash-icon.png")} style={{width: 200, height: 200}}/>
      <ActivityIndicator size="large" color="#fff"/>
      <Image source={require("@/assets/splash-illustration.png")} style={{position: "absolute", bottom: 0}}/>
      <StatusBar backgroundColor="transparent" style="auto" translucent/>
    </View>
  )
}