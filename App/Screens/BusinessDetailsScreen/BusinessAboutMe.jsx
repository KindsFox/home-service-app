import { TouchableOpacity, View, Text } from "react-native";
import React, { useState } from "react";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";

export default function BusinessAboutMe({business}) {
    const [isReadMore, setIsReadMore] = useState(false);

    return business&& (
        <View>
          <Heading text={"Обо мне"} />
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 16,
              color: Colors.GRAY,
              lineHeight: 28,
            }}
            numberOfLines={isReadMore ? 20 : 5}
          >
            {" "}
            {business.about}{" "}
          </Text>
          <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 16,
                color: Colors.PRIMARY,
              }}
            >
              {isReadMore ? "Свернуть" : "Читать далее"}
            </Text>
          </TouchableOpacity>
        </View>
    )
}