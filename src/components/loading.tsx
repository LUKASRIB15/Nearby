import { colors } from "@/utils/colors";
import { ActivityIndicator, View } from "react-native";

export function Loading(){
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors.green.base}/>
    </View>
  )
}