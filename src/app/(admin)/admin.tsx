import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rating: '',
    discount: '',
    origin: '',
    imageUrl: '',
  });

  const handleChange = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5106/api/restaurants', formData)
      .then(() => alert('Restaurant added successfully!'))
      .catch(error => console.log('Error adding restaurant:', error));
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={value => handleChange('name', value)} />
      <TextInput placeholder="Address" onChangeText={value => handleChange('address', value)} />
      <TextInput placeholder="Rating" keyboardType="numeric" onChangeText={value => handleChange('rating', value)} />
      <TextInput placeholder="Discount" keyboardType="numeric" onChangeText={value => handleChange('discount', value)} />
      <TextInput placeholder="Origin" onChangeText={value => handleChange('origin', value)} />
      <TextInput placeholder="Image URL" onChangeText={value => handleChange('imageUrl', value)} />
      <Button title="Add Restaurant" onPress={handleSubmit} />
    </View>
  );
};

export default AddRestaurantForm;
