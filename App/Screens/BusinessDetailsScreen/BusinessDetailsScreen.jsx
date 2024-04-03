import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList, SafeAreaView, Modal, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../../Utils/Colors";
import BusinessPhotos from "./BusinessPhotos";
import BusinessAboutMe from "./BusinessAboutMe";
import { Entypo } from '@expo/vector-icons';
import BookingModal from "./BookingModal";

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModal, setShowModal] = useState(false) 
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const onMessageBtnClick = () => {
    Linking.openURL('mailto:' + business?.email + '?subject= Зотел бы сделать заказ&body=Добрый день');
  }

  return (
    business && (
      <View>
        <ScrollView style={{ height: "90%" }}>
            <TouchableOpacity
              style={styles.backBtnContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>

            <Image
              source={{ uri: business?.images[0]?.url }}
              style={{ width: "100%", height: 300 }}
            />

            <View style={styles.infoContainer}>
              <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
                {business?.name}
              </Text>
              <View style={styles.subContainer}>
                <Text
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 20,
                    color: Colors.PRIMARY,
                  }}
                >
                  {business?.contactPerson}
                </Text>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    backgroundColor: Colors.PRIMARY_LIGHT,
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 14,
                  }}
                >
                  {business?.category.name}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 17,
                  color: Colors.GRAY,
                }}
              >
                <Entypo name="location-pin" size={25} color={Colors.PRIMARY} />
                {business?.adress}
              </Text>

              <View style={styles.horusontalLine} />

              {/* Секция о сотруднике */}
              <BusinessAboutMe business={business} />
              <View style={styles.horusontalLine} />
              <BusinessPhotos business={business} />
            </View>
        </ScrollView>

        <View
          style={{ display: "flex", flexDirection: "row", margin: 8, gap: 8 }}
        >
          <TouchableOpacity style={styles.messagebtn} onPress={() => onMessageBtnClick()}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
                fontSize: 18,
              }}
            >
              Сообщения
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookingbtn} onPress={() => setShowModal(true)}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Забронировать
            </Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" visible={showModal}>
          <BookingModal 
          businessId={business.id}
          hideModal={() => setShowModal(false)}/>
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
    backBtnContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: 20
    },
    infoContainer: {
        padding: 20,
        display: 'flex',
        gap: 7
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    horusontalLine: {
      borderWidth: 0.4,
      borderColor: Colors.BLACK,
      marginTop: 20,
      marginBottom: 20
    },
    messagebtn: {
      padding: 15,
      backgroundColor: Colors.WHITE,
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
      borderRadius: 99,
      flex: 1
    },
    bookingbtn: {
      padding: 15,
      backgroundColor: Colors.PRIMARY,
      borderWidth: 1,
      borderColor: Colors.WHITE,
      borderRadius: 99,
      flex: 1
    }
})