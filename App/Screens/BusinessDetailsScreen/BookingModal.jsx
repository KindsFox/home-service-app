import { View, TouchableOpacity, Text, StyleSheet, FlatList, KeyboardAvoidingView, ToastAndroid} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import moment from "moment/moment";

export default function BookingModal ({businessId, hideModal}) {
    const [date, setDate] = useState(dayjs());
    const [timeList, setTimeList] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState();
    const {user} = useUser();
    
    useEffect(() => {
      getTime();
    }, [])

    const getTime = () => {
      const timeList = [];
      for (let i = 8; i <= 12; i++){
        timeList.push({
          time: i + ':00 AM'
        })
        timeList.push({
          time: i + ':30 AM'
        })
      }

      for (let i = 1; i <= 7; i++){
        timeList.push({
          time: i + ':00 PM'
        })
        timeList.push({
          time: i + ':30 PM'
        })
      }
      setTimeList(timeList);
    }

    //Create Booking Method
    const createNewBooking= () => {
      if(!selectedTime || !selectedDate) {
        ToastAndroid.show('Пожалуйста выберите другую дута или время', ToastAndroid.LONG)
        return ;
      }
      const data = {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress.emailAddress,
        time: selectedTime,
        date: moment(selectedDate).format('DD-MMM-yyyy') ,
        note: note,
        businessId: businessId
      }
      GlobalApi.createBooking(data).then(resp => {
        console.log("Resp", resp);
        ToastAndroid.show('Мастер забронирован', ToastAndroid.LONG)
        hideModal();
      })
    }
  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>

        {/* Секция календарь */}
        <Heading text={"Выберите дату"} />
        <View style={styles.calendarContainer}>
          {/*  <DateTimePicker
          minDate={Date.now()}          
          mode="single"
          date={date}
          onChange={(params) => setDate(params.date)}
        /> */}
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={340}
            minDate={Date.now()}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>

        {/* Секция выбора времени */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Выберите время"} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime == item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Секция примечаний */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Примечания"} />
          <TextInput
            placeholder="Note"
            numberOfLines={4}
            multiline={true}
            style={styles.noteTextArea}
            onChange={(text) => setNote(text)}
          />
        </View>

        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => createNewBooking()}>
          <Text style={styles.confirmBtn}> Подтвердить </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Colors.PRIMARY
  },
  confirmBtn: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 17, 
    backgroundColor:Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2
  }
});