import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import PageHeading from "../../Components/PageHeading";
import { Ionicons } from '@expo/vector-icons';

export default function BookingModal ({hideModal}) {
    return (
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>
      </View>
    );
}