import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Market as MarketType} from "@/components/market-card";
import { api } from "@/services/api";
import { categoriesIcons } from "@/utils/category-icons";
import { colors } from "@/utils/colors";
import { IconArrowLeft, IconMapPin, IconPhone, IconScan, IconTicket } from "@tabler/icons-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, Modal, ScrollView, Text, View } from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";


type MarketAndRules = MarketType & {
  rules: {
    description: string
    id: string
    marketId: string
  }[]
}

export default function Market(){
  const [market, setMarket] = useState<MarketAndRules | null>(null)
  const [Icon, setIcon] = useState<React.ComponentType<TablerIconProps> | null>(null)
  const [isVisibleModal, setIsVisibleModal] = useState(false) 

  
  const [_, requestCameraPermission] = useCameraPermissions()

  const params = useLocalSearchParams<{id: string}>()


  async function getMarket(){
    try{
      const { data } = await api.get(`/markets/${params.id}`)

      setMarket(data)
      setIcon(categoriesIcons[data.categoryId])
    }catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar o estabelecimento. Tente novamente mais tarde")
    }
  }

  async function handleReadQrCode(){
    try{
      const {granted} = await requestCameraPermission()

      if(!granted){
        return Alert.alert("Alerta", "Sem a permissão de uso da câmera, não é possivel ler o QR Code")
      }

      setIsVisibleModal(true)
    }catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possível ler o QR Code. Tente novamente mais tarde")
    }
  
  }

  async function getCoupon(id: string){
    try{
      const {data} = await api.patch(`/coupons/${id}`)
      
      Alert.alert("Cupom", data.coupon)
      
    }catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possível resgatar o cupom. Tente novamente mais tarde")
    }
  }

  async function handleUseCoupon(id: string){
    setIsVisibleModal(false)

    Alert.alert("Cupom", "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?", [
      { style: "cancel", text: "Não"},
      {text: "Sim", onPress: () => getCoupon(id)}
    ])
  }

  useEffect(()=>{
    getMarket()
  }, [])

  if(!market){
    return <Loading />
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={{uri: market.cover}}
        className="w-full h-[232] -mb-8 bg-gray-200"
      >
        <View className="p-6 pt-14">
          <Button 
            className="self-start w-10 max-w-10 h-10 max-h-10"
            onPress={() => router.back()}
          >
            <Button.Icon icon={IconArrowLeft}/>
          </Button>
        </View>
      </ImageBackground>
      <View className="p-8 pb-0 rounded-t-3xl bg-gray-100 flex-1">
        <View className="gap-y-8">
          <View className="gap-y-3">
            <View className="flex-row items-center gap-x-2">
              <Text className="text-gray-600 font-app-bold text-xl">{market.name}</Text>
              {Icon && <Icon size={24} color={colors.green.light} />}
            </View>
            <Text className="text-gray-500 text-base font-app-regular leading-5">
              Na compra de um combo SuperRocket, leve outro combo de sua escolha de graça
            </Text>
            <View className="flex-row items-center gap-x-2 bg-red-light px-2 py-2.5 rounded-lg">
              <IconTicket size={24} color={colors.red.base}/>
              <Text className="font-app-regular text-gray-600 text-sm">
                <Text className="font-app-bold">{market.coupons} </Text>
                <Text>cupons disponíveis</Text>
              </Text>
            </View>
          </View>
          <View className="gap-y-4">
            <View>
              <Text className="text-gray-500 text-sm font-app-medium mb-3">Regulamento</Text>
              {
                market.rules.map(rule=>{
                  return (
                    <Text key={rule.id} className="text-gray-500 text-sm font-app-regular">{'  \u2022  '}{rule.description}</Text>
                  )
                })
              }              
            </View>
            <View className="h-0.5 bg-gray-200"/>
            <View>
              <Text className="text-gray-500 text-sm font-app-medium mb-3">Informações</Text>
              <View className="gap-x-2 flex-row items-center">
                <IconMapPin size={16} color={colors.gray[500]}/>
                <Text className="text-gray-500 text-sm font-app-regular">{market.address}</Text>
              </View>
              <View className="gap-x-2 flex-row items-center">
                <IconPhone size={16} color={colors.gray[500]}/>
                <Text className="text-gray-500 text-sm font-app-regular">{market.phone}</Text>
              </View>
            </View>
          </View>
          <View className="flex-row gap-x-3 ">
            {/* <Button 
              className="flex-1 flex-row items-center justify-center gap-x-3"
              onPress={handleReadQrCode}
            >
              <Button.Icon icon={IconScan}/>
              <Button.Title>Ler QR Code</Button.Title>
            </Button> */}
          </View>
        </View>
      </View>
      <Modal visible={isVisibleModal} style={{flex: 1}}>
        <CameraView 
          style={{flex: 1}}
          facing="back"
          onBarcodeScanned={({data}) => handleUseCoupon(data)}
        />
        <View style={{position: "absolute", bottom: 32, left: 32, right: 32}}>
          <Button onPress={()=> setIsVisibleModal(false)}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}