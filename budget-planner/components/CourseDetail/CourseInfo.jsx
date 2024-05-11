import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import { supabase } from "../../utils/SupabaseConfig";
import { useRouter } from "expo-router";

export default function CourseInfo({ categoryData }) {
  const [totalCost, setTotalCost] = useState(0);
  const [percTotal, setPercTotal] = useState(0);
  const router = useRouter();

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
    let perc = (total / categoryData.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
      ToastAndroid.show("Budget exceeded 100%", ToastAndroid.LONG);
    }
    setPercTotal(perc);
  };

  const { name, assigned_budget, icon, color, CategoryItems } = categoryData;
  const onDeleteCategory = () => {
    Alert.alert(
      "Are you sure you want to delete this category?",
      "This action cannot be undone",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("CategoryItems")
              .delete()
              .eq("category_id", categoryData.id);
            await supabase.from("Category").delete().eq("id", categoryData.id);
            ToastAndroid.show('Category deleted!', ToastAndroid.SHORT);
            router.replace("/(tabs)");
          },
        },
      ]
    );
  };

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
            {CategoryItems?.length || 0} Item(s)
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteCategory()}>
          <Ionicons name="trash" size={24} color={Colors.BLACK} />
        </TouchableOpacity>
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
