import { colors } from "@/utils/colors";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import {twMerge} from "tailwind-merge";

type ButtonProps = TouchableOpacityProps &{
  children: React.ReactNode
}

function Button({children, className,...rest}: ButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      className={twMerge("bg-green-base h-[56] max-h-[56] rounded-xl items-center justify-center elevation", className)}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

type TitleProps = TextProps & {
  children: React.ReactNode
}

function Title({children, ...rest}: TextProps) {
  return (
    <Text className="text-gray-100 font-app-semibold text-base" {...rest}>
      {children}
    </Text>
  )
}

type IconProps = {
  icon: React.ComponentType<TablerIconProps>
}

function Icon({icon: Icon}: IconProps){
  return (
    <Icon size={24} color={colors.gray[100]}/>
  )
}

Button.Title = Title
Button.Icon = Icon

export { Button }