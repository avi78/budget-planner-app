import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";

export default function CourseInfo({ categoryData }) {
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);

  useEffect(() => {
    if (categoryData) {
      calculateTotalPerc();
    }
  }, [categoryData]);

  const calculateTotalPerc = () => {
    let total = 0;
    categoryData?.CategoryItems?.forEach((item) => {
      total += item.cost;
    });
    setTotalCost(total);
    const perc = (total / categoryData.assigned_budget) * 100;
    setPercTotal(perc);
  };

  const { name, assigned_budget, icon, color, CategoryItems } = categoryData;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={[styles.textIcon, { backgroundColor: color }]}>
            {icon}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.categoryName}>{name}</Text>
          <Text style={styles.categoryItemText}>
            {CategoryItems?.length || 0} Item
          </Text>
        </View>
        <Ionicons name="trash" size={24} color={Colors.BLACK} />
      </View>
      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: "outfit" }}>₹{totalCost}</Text>
        <Text style={{ fontFamily: "outfit" }}>
          Total Budget: {assigned_budget}
        </Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View
          style={[styles.progressBarSubContainer, { width: `${percTotal}%` }]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIcon: {
    fontSize: 35,
    padding: 20,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  categoryName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  categoryItemText: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  amountContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  progressBarMainContainer: {
    width: "100%",
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 10,
    marginTop: 7,
  },
  progressBarSubContainer: {
    height: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
});
