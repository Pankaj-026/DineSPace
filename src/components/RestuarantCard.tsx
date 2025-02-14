import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const RestaurantCard = ({ id, name, address, rating, discount, origin, imageUrl, status }) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          await AsyncStorage.setItem("SingleRestaurantDetails", id);
          if(status ===  true ){
            router.push(`/(screen)/RestuarantDetailsScreen`);
          }
        } catch (error) {
          console.error("Error saving restaurant ID:", error);
        }
      }}

    >

      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <View style={styles.row}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <Text style={styles.discount}>Discount: {discount}%</Text>
          <Text style={styles.origin}>Origin: {origin}</Text>
          {status === false && (
            <View style={styles.closedBadge}>
              <MaterialIcons name="cancel" size={16} color="red" />
              <Text style={styles.closedText}>Closed</Text>

            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  discount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  origin: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  closedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  closedText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  closeButton: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  closeButtonText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RestaurantCard;