import { Text, View } from "react-native";
import { Market } from "./market-card";
import { categoriesIcons } from "@/utils/category-icons";
import { colors } from "@/utils/colors";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

type PinLocationProps = {
  marketByPin: Market 
}

export function PinLocation({marketByPin: market}: PinLocationProps){
  const Icon = categoriesIcons[market.categoryId]
  
  return (
    <View className="rounded-2xl px-6 pt-5 pb-7 gap-y-4 bg-gray-100 elevation absolute bottom-10 right-4 left-4 border border-gray-200">
      <View className="flex-row">
        <View className="flex-row items-center flex-1 gap-x-2">
          <Text className="font-app-bold text-xl text-gray-600">{market.name}</Text>
          <Icon size={24} color={colors.green.light} />
        </View>
        <View className="flex-row items-center bg-red-light px-2 py-1.5 rounded-lg gap-x-1.5">
          <IconTicket size={20} color={colors.red.base}/>
          <Text className="font-app-regular text-base text-gray-600">{market.coupons}</Text>
        </View>
      </View>
      <View className="gap-y-1">
        <View className="gap-x-2 flex-row items-center">
          <IconMapPin size={16} color={colors.gray[500]}/>
          <Text className="font-app-regular text-sm text-gray-500">{market.address}</Text>
        </View>
        <View className="gap-x-2 flex-row items-center">
          <IconPhone size={16} color={colors.gray[500]}/>
          <Text className="font-app-regular text-sm text-gray-500">{market.phone}</Text>
        </View>
      </View>
    </View>
  )
}