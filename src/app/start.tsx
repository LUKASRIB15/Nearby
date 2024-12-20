import { Image, Text, View } from "react-native"
import LogoSvg from "@/assets/logo.svg"
import { Step } from "@/components/step"
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native"
import { Button } from "@/components/button"
import { router } from "expo-router"

export default function Start(){
  return (
    <View className="flex-1 px-10 py-16 bg-gray-100 justify-between">
      <View className="gap-y-10">
        <View className="gap-y-7">
          <LogoSvg width={48} height={48}/>
          <View className="gap-y-3">
            <Text className="text-gray-600 font-app-bold text-2xl">Boas vindas ao Nearby!</Text>
            <Text className="text-gray-500 font-app-regular text-base leading-6">Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.</Text>
          </View>
        </View>
        <View className="gap-y-6">
          <Text className="text-gray-500 font-app-regular text-base">Veja como funciona:</Text>
          <Step 
            icon={IconMapPin} 
            title="Encontre estabelecimentos"
            description="Veja locais perto de você que são parceiros Nearby"
          />

          <Step 
            icon={IconQrcode} 
            title="Ative o cupom com QR Code"
            description="Escaneie o código no estabelecimento para usar o benefício"
          />

          <Step 
            icon={IconTicket}
            title="Garanta vantagens perto de você"
            description="Ative cupons onde estiver, em diferentes tipos de estabelecimentos"
          />
        </View>
      </View>
      <Button onPress={() => router.navigate("/home")}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  )
}