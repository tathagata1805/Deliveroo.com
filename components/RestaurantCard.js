import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  shortDescription,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="bg-white mr-3 shadow">
      <Image
        // source={{ uri: imgUrl }}
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 round-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <Icons.StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500"> {rating}</Text> · {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          <Icons.LocationMarkerIcon color="grey" opacity={0.4} size={22} />
          <Text className="text-gray-500">{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
