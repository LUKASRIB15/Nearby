import { colors } from "@/utils/colors";
import { IconTicket } from "@tabler/icons-react-native";
import { useEffect } from "react";
import { Image, Pressable, PressableProps, Text, View } from "react-native";
import Animated, { FadeInUp, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedPressable= Animated.createAnimatedComponent(Pressable)

export type Market = {
  id: string
  address: string
  categoryId: string
  coupons: number
  cover: string
  description: string
  name: string
  phone: string
  latitude: number
  longitude: number
}

type MarketCardProps = PressableProps & {
  market: Market
  delayAnimation?: number
  isLongPressActive?: boolean
}

export function MarketCard({market, delayAnimation = 0, isLongPressActive = false, ...rest}: MarketCardProps){
  const isPressed = useSharedValue(0) 

  const animatedPressableStyle = useAnimatedStyle(()=>{
    return {
      backgroundColor: interpolateColor(
        isPressed.value,
        [0, 1],
        [colors.gray[100], colors.gray[200]]
      )
    }
  })

  useEffect(()=>{
    isPressed.value = withTiming(isLongPressActive ? 1 : 0)
  }, [isLongPressActive])
  
  return (
    <AnimatedPressable 
      entering={FadeInUp.duration(400).delay(delayAnimation)}
      className="gap-x-4 flex-row py-2 pr-4 pl-2 rounded-xl border border-gray-200"
      style={animatedPressableStyle}  
      {...rest}
    >
      <Image source={{uri: market.cover}} className="w-[116] h-[104] rounded-md object-cover"/>
      <View className="py-2 justify-between flex-1">
        <View className="gap-y-1">
          <Text className="font-app-semibold text-sm text-gray-600">{market.name}</Text>
          <Text numberOfLines={2} className="font-app-regular text-xs text-gray-500">{market.description}</Text>
        </View>
        <View className="flex-row gap-x-2 items-center">
          <IconTicket size={16} color={market.coupons > 0 ? colors.red.base : colors.gray[400]} />
          <Text className="text-xs font-app-regular text-gray-400">{market.coupons} cupons disponíveis</Text>  
        </View>
      </View>
    </AnimatedPressable>
  )
}