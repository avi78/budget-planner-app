import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { useRouter } from "expo-router";

export default function CategoryList({ categoryList }) {
  const router = useRouter();
  const onCategoryClick = (category) => {
    router.push({
      pathname: "/category-detail",
      params: { categoryId: category.id },
    });
  };
  const calculateTotalCost=(categoryItems)=>{
    let totalCost=0;
    categoryItems.forEach(item=>{
        totalCost+=item.cost;
    })
    return totalCost
  }
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 23,
          marginBottom: 10,
        }}
      >
        Latest Budget
      </Text>
      <View>
        {categoryList &&
          categoryList.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.container}
              onPress={() => onCategoryClick(category)}
            >
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.iconText,
                    { backgroundColor: category?.color },
                  ]}
                >
                  {category.icon}
                </Text>
              </View>
              <View style={styles.subContainer}>
                <View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                  <Text style={styles.itemCount}>
                    {category?.CategoryItems?.length} Items
                  </Text>
                </View>
                <Text style={styles.totalAmountText}>
                  ₹{calculateTotalCost(category?.CategoryItems)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  iconText: {
    padding: 15,
    fontSize: 25,
    borderRadius: 15,
  },
  categoryText: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  itemCount: {
    fontFamily: "outfit",
    fontSize: 15,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  totalAmountText: {
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
});
