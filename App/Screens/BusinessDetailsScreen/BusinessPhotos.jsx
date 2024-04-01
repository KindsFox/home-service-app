import { View, Image, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";

export default function BusinessPhotos({business}) {
    return (
      <View>
        <Heading text={"Фото"} />

        <FlatList
          
          data={business.images}
          numColumns={2}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.url }}
              style={{
                width: "100%",
                flex: 1,
                height: 120,
                borderRadius: 15,
                margin: 7,
              }}
              />
          )}
        />
      </View>
    );
}