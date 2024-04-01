import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";

export default function Heading({text, isViewAll = false}) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{text}</Text>
        {isViewAll && <Text>View All</Text>}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    marginBottom: 10,
  },
});
