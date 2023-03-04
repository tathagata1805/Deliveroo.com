import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "featured"] {..., restaurants[]->{..., dishes[]->}}`)
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log("Err at Home Page:", err);
      });
  }, []);

  console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
          <Text className="font-bold text-xl">
            Current location
            <Icons.ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <Icons.UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <Icons.SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Icons.AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Content */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* categories */}
        <Categories />
        {/* <FeaturedRow id="1" title="Offers near you" description="description" />
        <FeaturedRow id="2" title="Featured" description="description" />
        <FeaturedRow id="3" title="Tasty Discounts" description="description" /> */}
        {/* features rows */}
        {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category?.short_description}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
