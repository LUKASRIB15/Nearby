import { colors } from "@/utils/colors";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import React from "react";
import { Text, View } from "react-native";

type StepProps = {
  icon: React.ComponentType<TablerIconProps>
  title: string
  description: string
}

export function Step({icon: Icon, title, description} : StepProps){
  return (
    <View className="flex-row gap-x-4">
      {Icon && <Icon size={32} color={colors.red.base}/> }
      <View className="gap-y-1 flex-1">
        <Text className="text-gray-600 text-base font-app-semibold">{title}</Text>
        <Text className="text-gray-500 text-sm font-app-regular">{description}</Text>
      </View>
    </View>
  )
}