import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/SupabaseConfig";
import { decode } from "base64-arraybuffer";
import { useLocalSearchParams, useRouter } from "expo-router";

const placeholder =
  "https://th.bing.com/th/id/OIP.aztohNZRhGrKV9xf5x_guAHaHa?rs=1&pid=ImgDetMain";

export default function AddNewCategoryItem() {
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const {categoryId} = useLocalSearchParams();
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [cost, setCost] = useState();
  const [note, setNote] = useState();
  const [loading,setLoading]=useState(false);
  const router=useRouter();

  const onImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8,
        base64: true,
      });

      if (!result.cancelled) {
        setPreviewImage(result.assets[0].uri);
        setImage(result.assets[0].base64);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }

  };

  const onClickAdd = async () => {
    setLoading(true);
    const fileName = Date.now();
    

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName+'.png', decode(image), {
        contentType: 'image/png',
      });

    if(data){
        const fileUrl =
          "https://axpsxpmbeqnowgtwgtrw.supabase.co/storage/v1/object/public/images/"+fileName+'.png';
          console.log(fileUrl);
            const { data, error } = await supabase
              .from("CategoryItems")
              .insert([
                {
                  name: name,
                  cost: cost,
                  url: url,
                  image: fileUrl,
                  note: note,
                  category_id:categoryId,
                }
              ]).select();
              ToastAndroid.show("Item Added!", ToastAndroid.SHORT);
              console.log(data);
              setLoading(false);
              router.replace({
                pathname: "/category-detail",
                params: { categoryId: categoryId },
              });
    }
      
    
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE }}>
        <TouchableOpacity onPress={onImagePick}>
          <Image source={{ uri: previewImage }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Ionicons name="pricetag" size={24} color={Colors.GRAY} />
          <TextInput
            placeholder="Item Name"
            style={styles.input}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome6
            name="money-check-dollar"
            size={24}
            color={Colors.GRAY}
          />
          <TextInput
            placeholder="Cost"
            keyboardType="number-pad"
            onChangeText={(value) => setCost(value)}
            style={styles.input}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Ionicons name="link" size={24} color={Colors.GRAY} />
          <TextInput
            placeholder="Url"
            onChangeText={(value) => setUrl(value)}
            style={styles.input}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome6 name="note-sticky" size={24} color={Colors.GRAY} />
          <TextInput
            placeholder="Note"
            onChangeText={(value) => setNote(value)}
            style={styles.input}
            numberOfLines={3}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            !name || !cost ? { backgroundColor: Colors.GRAY } : null,
          ]}
          disabled={!name || !cost || loading}
          onPress={onClickAdd}
        >
          {loading ? (
            <ActivityIndicator color={Colors.WHITE} size={'large'}/>
          ) : (
            <Text style={styles.buttonText}>Add</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.GRAY,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
});
