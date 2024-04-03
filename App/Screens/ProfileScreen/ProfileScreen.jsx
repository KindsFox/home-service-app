import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {Ionicons} from '@expo/vector-icons';
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { FlatList } from "react-native-gesture-handler";

export default function ProfileScreen() {
    const {user} = useUser();
    const profileMenu = [
      {
        id: 1,
        name: "Home",
        icon: "home",
      },
      {
        id: 2,
        name: "My Booking",
        icon: "bookmark-sharp",
      },
      {
        id: 3,
        name: "Logout",
        icon: "log-out",
      },
    ];

    return (
      <View>
        <View
          style={{
            padding: 20,
            paddingTop: 30,
            backgroundColor: Colors.PRIMARY,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "outfit-bold",
              color: Colors.WHITE,
            }}
          >
            Профиль
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Image
              source={{ uri: user.imageUrl }}
              style={{ width: 70, height: 90, borderRadius: 99 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: "outfit-medium",
                color: Colors.WHITE,
                marginTop: 8,
              }}
            >
              {user.fullName}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontFamily: "outfit-medium",
                color: Colors.WHITE,
                marginTop: 8,
              }}
            >
              {user?.primaryEmailAddress.emailAddress}
            </Text>
          </View>
        </View>

        <View style={{paddingTop: 60}}>
          <FlatList
            data={profileMenu}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 40,
                  paddingHorizontal: 80
                }}
              >
                <Ionicons name={item.icon} size={444} color={Colors.PRIMARY} />
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
}