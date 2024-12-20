import { colors } from "@/utils/colors"
import { Pressable, PressableProps } from "react-native"
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Category as CategoryType } from "./categories"
import { categoriesIcons } from "@/utils/category-icons"
import React, { useEffect } from "react"


const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type CategoryProps = PressableProps & {
  category: CategoryType
  isChecked: boolean
}

export function Category({category, isChecked, ...rest}: CategoryProps){
  const scale = useSharedValue(1)
  const check = useSharedValue(isChecked ? 1 : 0)

  const Icon = categoriesIcons[category.id]

  const animatedPressableStyle = useAnimatedStyle(()=>{
    return {
      transform: [{scale: scale.value}],
      backgroundColor: interpolateColor(
        check.value,
        [1, 0],
        [colors.green.base, colors.gray[100]]
      )
    }
  })

  const animatedTextStyle = useAnimatedStyle(()=>{
    return {
      color: interpolateColor(
        check.value,
        [1, 0],
        [colors.gray[100], colors.gray[500]]
      )
    }
  })
  
  function onPressIn(){
    scale.value = withTiming(1.1, {duration: 200, easing: Easing.bounce})
  }

  function onPressOut(){
    scale.value = withTiming(1, {duration:200})
  }

  useEffect(()=>{
    check.value = withTiming(isChecked ? 1 : 0)
  }, [isChecked])

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut} 
      className="flex-row items-center gap-x-2 px-3 py-2 rounded-md elevation"
      style={animatedPressableStyle}
      {...rest}
    >
      
      
      
      <Icon size={16} color={isChecked ? colors.gray[100] : colors.gray[500]}/>
      
   
      <Animated.Text 
        className="text-sm text-gray-500 font-app-regular"
        
        style={animatedTextStyle}
      >
        {category.name}
      </Animated.Text>
    </AnimatedPressable>
  )
}