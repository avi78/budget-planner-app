import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "./../utils/Colors";
import ColorPicker from "../components/ColorPicker";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { supabase } from "../utils/SupabaseConfig";
import { client } from "../utils/KindeConfig";
import { useRouter } from "expo-router";

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [categoryName, setCategoryName] = useState();
  const [totalBudget, setTotalBudget] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onCreateCategory = async () => {
    setLoading(true);
    try {
      const user = await client.getUserDetails();
      const { data, error } = await supabase
        .from("Category")
        .insert([
          {
            name: categoryName,
            icon: selectedIcon,
            assigned_budget: totalBudget,
            color: selectedColor,
            created_by: user.email,
          },
        ])
        .select();
      console.log(data);
      if (data) {
        router.replace({
          pathname: "/category-detail",
          params: {
            categoryId: data[0].id,
          },
        });
        setLoading(false);
        ToastAndroid.show("Category Created!", ToastAndroid.SHORT);
      }
      if(error){
        setLoading(false);
      }
    } catch (error) {
      // Handle any errors here
      console.error("Error creating category:", error);
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      {/* Add Category Name and Total Budget Section */}
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Category Name"
          onChangeText={(v) => setCategoryName(v)}
          style={{ width: "100%", fontSize: 16 }}
        />
      </View>

      <View style={styles.inputView}>
        <FontAwesome6 name="money-check-dollar" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Total Budget"
          onChangeText={(v) => setTotalBudget(v)}
          keyboardType="numeric"
          style={{ width: "100%", fontSize: 16 }}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.Button,
          !categoryName || !totalBudget
            ? { backgroundColor: Colors.GRAY }
            : null,
        ]}
        disabled={!categoryName || !totalBudget || loading}
        onPress={() => onCreateCategory()}
      >
        {loading? <ActivityIndicator color={Colors.WHITE}/>:
        <Text
          style={{ textAlign: "center", color: Colors.WHITE, fontSize: 16 }}
        >
          Create
        </Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 50,
    paddingHorizontal: 30,
    color: Colors.WHITE,
  },
  inputView: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 5,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
  },
  Button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
});
