import { Categories, Category } from "@/components/categories";
import { Loading } from "@/components/loading";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, useWindowDimensions, View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import MapView, { Marker } from "react-native-maps"
import { Market, MarketCard } from "@/components/market-card";
import { colors } from "@/utils/colors";
import * as Location from "expo-location"
import { router } from "expo-router";
import { PinLocation } from "@/components/pin-location";
import { Button } from "@/components/button";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import * as Haptics from "expo-haptics"

export default function Home(){
  
  const [categories, setCategories] = useState<Category[]>([])
  const [markets, setMarkets] = useState<Market[]>([])
  const [category, setCategory] = useState("")
  const [selectedPin, setSelectedPin] = useState<Market | null>(null)
  const [homeIsReady, setHomeIsReady] = useState(false)
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const mapViewRef = useRef<MapView>(null)
  
  const dimensions = useWindowDimensions()
  
  const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494
  }

  const snapPoints = {
    min: 279,
    max: dimensions.height - 128
  }
  
  async function fetchCategories(){
    try{
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
      setHomeIsReady(true)
    }catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar as categorias. Tente novamente mais tarde")
    }
  }

  async function fetchMarketsByCategory(){
    try{
      if(!category){
        return
      }

      const {data} = await api.get("/markets/category/" + category)
      setMarkets(data)
    }catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar as lojas dessa categoria. Tente novamente mais tarde")
    }
  }

  async function getCurrentLocation(){
    try{
      let { status } = await Location.requestForegroundPermissionsAsync()
      
      if(status !== "granted"){
        throw new Error("Para você visualizar o mapa, é necessário você permitiro o acesso à localização")
      }
    }catch(error){
      console.log(error)
      if(error instanceof Error){
        Alert.alert("Alerta", error.message)
      }
      router.back()
    }
  }

 function handleSelectPinByLongPress(market: Market){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)

    bottomSheetRef.current?.close()

    mapViewRef.current?.animateToRegion({
      latitude: market.latitude,
      longitude: market.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }, 700)

    setSelectedPin(market)
  }

  useEffect(()=>{
    fetchCategories()
    getCurrentLocation()
    bottomSheetRef.current?.collapse()
  }, [])

  useEffect(()=>{
    fetchMarketsByCategory()
  }, [category])

  if(!homeIsReady){
    return <Loading/>
  }


  return (
    <View className="flex-1">
      {
        selectedPin ? 
        (
          <Button 
            className="absolute top-14 left-6 h-10 max-h-10 w-10 max-w-10 p-2"
            onPress={() => setSelectedPin(null)}
          >
            <Button.Icon icon={IconArrowLeft}/>
          </Button>
        )  
        :
        (
          <Categories 
            categories={categories} 
            currentCategory={category} 
            onChangeCategory={setCategory}
          />
        )
      }
      <MapView 
        ref={mapViewRef}
        style={{flex: 1, zIndex: -1}}
        className="absolute top-0 left-0 right-0 bottom-0"
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        customMapStyle={[
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            stylers: [{ visibility: 'off' }],
          },
        ]}
      >
        <Marker coordinate={currentLocation} image={require("@/assets/location.png")} identifier="current"/>
        {
          markets.map(market =>{
            
                          
            return (
              <Marker 
                coordinate={{latitude: market.latitude, longitude: market.longitude}}
                identifier={market.id}
                key={market.id}
                image={require("@/assets/pin.png")}
                onSelect={() => {
                  bottomSheetRef.current?.close()
                  setSelectedPin(market)
                }}
                
              />
            )
          })
        }
      </MapView>

      {
        selectedPin ? 
        (
          <PinLocation marketByPin={selectedPin}/>
        )
        :
        (
          <BottomSheet 
            ref={bottomSheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]}
            enableOverDrag={false}
            style={{zIndex: 30}}
            handleIndicatorStyle={{width: 80, height: 4, backgroundColor: colors.gray[300]}}
          >
            <BottomSheetFlatList 
              data={markets}
              keyExtractor={item => item.id}
              scrollEnabled
              ListHeaderComponent={()=>(
                <Text className="text-gray-600 font-app-regular text-base mt-6">Explore locais perto de você</Text>
              )}
              renderItem={({item, index})=>{
                
                const LongPressGesture = Gesture
                  .LongPress()
                  .minDuration(1000)
                  .onBegin(() => {
                    runOnJS(setSelectedMarketId)(item.id)
                  })
                  .onStart(async ()=>{
                    runOnJS(handleSelectPinByLongPress)(item)
                  })
                  .onFinalize(() => {
                    runOnJS(setSelectedMarketId)(null)
                  })

                return (
                  <GestureDetector gesture={LongPressGesture}>
                    <MarketCard 
                      market={item}
                      delayAnimation={index * 300}
                      isLongPressActive = {item.id === selectedMarketId}
                      onPress={() => router.navigate(`/market/${item.id}`)}
                    />
                  </GestureDetector>
                )
              }}
              contentContainerClassName={"gap-y-4 pb-5"}
              className={"px-4"}
            />
          </BottomSheet>
        )
      }
    </View>
  ) 
}