import {  FlatList } from "react-native";
import { categoriesIcons } from "@/utils/category-icons";
import React from "react";
import { Category } from "./category";

export type Category = {
  id: string
  name: string
}

type CategoriesProps = {
  categories: Category[]
  currentCategory: string
  onChangeCategory: (categoryId: string)=> void
}

export function Categories({categories, currentCategory, onChangeCategory}: CategoriesProps){

  return (
    <FlatList 
      data={categories}
      keyExtractor={item => item.name}
      renderItem={({item})=>{
        return (
          <Category 
            category={item}
            onPress={() => onChangeCategory(item.id)}
            isChecked={item.id === currentCategory}
          />
        )
      }}
      contentContainerClassName="gap-x-3 flex-grow pr-12"
      className="px-6 p mt-16 z-0 absolute"
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  )
}