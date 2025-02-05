import React, { useState } from "react";
import { View, TextInput, Button, Text, Image, ScrollView, Alert, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import url from "@/src/constants/axiosUrl";

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cuisine: "",
    timings: { open: "", close: "" },
    popularDishes: "",
    rating: "",
    googleRating: "",
    discount: "",
    origin: "",
    imageUrl: "",
    contactNumber: "",
    restaurantOwnerGmail: "",
    amenities: "",
    description: "",
    location: "",
    moreImages: [],
    menuImages: [],
  });

  const [localImage, setLocalImage] = useState<string | null>(null);

  const handleChange = (fieldPath, value) => {
    const keys = fieldPath.split('.');
    setFormData(prevState => {
      let updatedState = { ...prevState };
      let nestedField = updatedState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          nestedField[key] = value;
        } else {
          nestedField = nestedField[key];
        }
      });

      return updatedState;
    });
  };


  const pickImage = async (imageType: "main" | "more" | "menu") => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access gallery is required!");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setLocalImage(selectedAsset.uri);
      if (imageType === "main") handleImageUpload(selectedAsset.uri, "imageUrl");
      else if (imageType === "more") handleImageUpload(selectedAsset.uri, "moreImages");
      else handleImageUpload(selectedAsset.uri, "menuImages");
    }
  };

  const handleImageUpload = async (imageUri: string, field: string) => {
    const imageFormData = new FormData();
    imageFormData.append("image", {
      uri: imageUri,
      name: "restaurant.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await axios.post(`${url}/api/img/upload`, imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = response.data.data.secure_url;
      if (field === "moreImages" || field === "menuImages") {
        setFormData((prev) => ({ ...prev, [field]: [...prev[field], imageUrl] }));
      } else {
        handleChange(field, imageUrl);
      }
    } catch (error: any) {
      console.error("Error uploading image:", error.response?.data || error);
    }
  };

  const handleSubmit = async () => {
    try {
      const processedData = {
        ...formData,
        cuisine: formData.cuisine.split(","),
        popularDishes: formData.popularDishes.split(","),
        amenities: formData.amenities.split(","),
      };

      await axios.post(`${url}/api/restaurants`, processedData);
      Alert.alert("Success", "Restaurant added successfully!");
      setFormData({
        name: "",
        address: "",
        cuisine: "",
        timings: { open: "", close: "" },
        popularDishes: "",
        rating: "",
        googleRating: "",
        discount: "",
        origin: "",
        imageUrl: "",
        contactNumber: "",
        restaurantOwnerGmail: "",
        amenities: "",
        description: "",
        location: "",
        moreImages: [],
        menuImages: [],
      });
      setLocalImage(null);
    } catch (error) {
      console.error("Error adding restaurant:", error);
      Alert.alert("Submission Error", "Failed to add restaurant");
    }
  };

  return (
    <ScrollView className="p-4 bg-gray-100 ">
      <SafeAreaView></SafeAreaView>
      <Text className="text-2xl font-bold text-center mb-8">Add Restaurant Details</Text>

      {/* Text Inputs */}
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Name" value={formData.name} onChangeText={(value) => handleChange("name", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Address" value={formData.address} onChangeText={(value) => handleChange("address", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Cuisine (comma-separated)" value={formData.cuisine} onChangeText={(value) => handleChange("cuisine", value)} />
      <TextInput
        className="border rounded-md px-3 py-2 mb-3"
        placeholder="Open Time"
        value={formData.timings?.open || ""}
        onChangeText={(value) => handleChange("timings.open", value)}
      />
      <TextInput
        className="border rounded-md px-3 py-2 mb-3"
        placeholder="Close Time"
        value={formData.timings?.close || ""}
        onChangeText={(value) => handleChange("timings.close", value)}
      />

      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Popular Dishes (comma-separated)" value={formData.popularDishes} onChangeText={(value) => handleChange("popularDishes", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Rating" keyboardType="numeric" value={formData.rating} onChangeText={(value) => handleChange("rating", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Google Rating" keyboardType="numeric" value={formData.googleRating} onChangeText={(value) => handleChange("googleRating", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Discount" keyboardType="numeric" value={formData.discount} onChangeText={(value) => handleChange("discount", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Origin" value={formData.origin} onChangeText={(value) => handleChange("origin", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Contact Number" value={formData.contactNumber} onChangeText={(value) => handleChange("contactNumber", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Owner Gmail" value={formData.restaurantOwnerGmail} onChangeText={(value) => handleChange("restaurantOwnerGmail", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Description" value={formData.description} onChangeText={(value) => handleChange("description", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="amenities (comma-separated)" value={formData.amenities} onChangeText={(value) => handleChange("amenities", value)} />
      <TextInput className="border rounded-md px-3 py-2 mb-3" placeholder="Location" value={formData.location} onChangeText={(value) => handleChange("location", value)} />

      {/* Image Pickers */}
      <TouchableOpacity onPress={() => pickImage("main")} className="bg-blue-500 rounded-md p-3 mb-3">
        <Text className="text-white text-center">Pick Main Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pickImage("more")} className="bg-blue-500 rounded-md p-3 mb-3">
        <Text className="text-white text-center">Pick More Images</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pickImage("menu")} className="bg-blue-500 rounded-md p-3 mb-3">
        <Text className="text-white text-center">Pick Menu Images</Text>
      </TouchableOpacity>

      {/* Image Preview */}
      {localImage && <Image source={{ uri: localImage }} className="w-32 h-32 self-center mb-3 rounded-md" />}

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} className="bg-green-500 rounded-md p-3">
        <Text className="text-white text-center">Add Restaurant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRestaurantForm;
