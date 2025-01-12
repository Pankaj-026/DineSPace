import React, { useState } from "react";
import { View, TextInput, Button, Text, Image, ScrollView, Alert, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rating: "",
    discount: "",
    origin: "",
    imageUrl: "",
  });

  const [localImage, setLocalImage] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access gallery is required!');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use updated "MediaType.Images"
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0]; // Ensure this is defined
      setLocalImage(selectedAsset.uri); // Set the selected image's URI
      handleImageUpload(selectedAsset.uri); // Pass URI to upload handler
    }
  };


  const handleImageUpload = async (imageUri: string) => {
    const formData = new FormData();

    formData.append("image", {
      uri: imageUri,
      name: 'restaurant.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await axios.post("http://192.168.0.101:5106/api/img/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded:", response.data);
      handleChange("imageUrl", response.data.data.secure_url); // Update with Cloudinary URL
    } catch (error: any) {
      console.error("Error uploading image:", error.response?.data || error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://192.168.0.101:5106/api/restaurants", formData);
      Alert.alert("Success", "Restaurant added successfully!");
      setFormData({
        name: "",
        address: "",
        rating: "",
        discount: "",
        origin: "",
        imageUrl: "",
      });
      setLocalImage(null);
    } catch (error) {
      console.error("Error adding restaurant:", error);
      Alert.alert("Submission Error", "Failed to add restaurant");
    }
  };

  return (
    <ScrollView className="p-4 bg-gray-100 flex-grow">
      <Text className="text-2xl font-bold text-center mb-4">Add Restaurant Details</Text>

      <TextInput
        className="border rounded-md bg-white px-3 py-2 mb-3"
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        className="border rounded-md bg-white px-3 py-2 mb-3"
        placeholder="Address"
        value={formData.address}
        onChangeText={(value) => handleChange("address", value)}
      />
      <TextInput
        className="border rounded-md bg-white px-3 py-2 mb-3"
        placeholder="Rating"
        keyboardType="numeric"
        value={formData.rating}
        onChangeText={(value) => handleChange("rating", value)}
      />
      <TextInput
        className="border rounded-md bg-white px-3 py-2 mb-3"
        placeholder="Discount"
        keyboardType="numeric"
        value={formData.discount}
        onChangeText={(value) => handleChange("discount", value)}
      />
      <TextInput
        className="border rounded-md bg-white px-3 py-2 mb-3"
        placeholder="Origin"
        value={formData.origin}
        onChangeText={(value) => handleChange("origin", value)}
      />

      <TouchableOpacity onPress={pickImage} className="bg-blue-500 rounded-md p-3 mb-3">
        <Text className="text-white text-center">Pick an Image</Text>
      </TouchableOpacity>

      {localImage && (
        <Image source={{ uri: localImage }} className="w-32 h-32 self-center mb-3 rounded-md" />
      )}

      <TouchableOpacity onPress={handleSubmit} className="bg-green-500 rounded-md p-3">
        <Text className="text-white text-center">Add Restaurant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddRestaurantForm;
