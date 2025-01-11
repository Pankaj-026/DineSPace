import React from "react";
import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RestuarantImg from "@/src/constants/imagePath";

// type RouteParamList = {
//     RestaurantDetails: {
//         id: number;
//         name: string;
//         address: string;
//         rating: number;
//         discount: number;
//         origin: string;
//         imageUrl: string;
//     };
// };

// type NavigationProp = StackNavigationProp<RouteParamList, "RestaurantDetails">;

const RestuarantList = [
    {
        id: 1,
        name: "Ichiraku Ramen",
        address: "Hidden Leaf Village, Konoha",
        rating: 4.9,
        discount: 20,
        origin: "Japanese",
        imageUrl: RestuarantImg.Ichiraku_ramen, // Reference to the image
    },
    {
        id: 2,
        name: "Attack on Sushi",
        address: "Shiganshina District, Wall Maria",
        rating: 4.8,
        discount: 15,
        origin: "Japanese",
        imageUrl: RestuarantImg.aot_sushi,
    },
    {
        id: 3,
        name: "Soul Society Sweets",
        address: "Karakura Town, Japan",
        rating: 4.6,
        discount: 18,
        origin: "Desserts",
        imageUrl: RestuarantImg.bleachCafe,
    },
    {
        id: 4,
        name: "One Piece Bistro",
        address: "Thousand Sunny, Grand Line",
        rating: 4.7,
        discount: 25,
        origin: "Seafood",
        imageUrl: RestuarantImg.onePiece,
    },
    {
        id: 5,
        name: "Hunter x Burger",
        address: "Whale Island, Republic of Padokea",
        rating: 4.5,
        discount: 22,
        origin: "Fast Food",
        imageUrl: RestuarantImg.hunterXBurger,
    },
    {
        id: 6,
        name: "Bunny Girl Senpai Cafe",
        address: "Hentai Heaven, Man of Culture",
        rating: 5,
        discount: 69,
        origin: "Japan",
        imageUrl:
            "https://preview.redd.it/bunny-cafe-quintuplets-v0-84n9ny8pw33b1.jpg?width=1080&crop=smart&auto=webp&s=24a34c7e4f4f98e488b97d1fa0533b7481dc8abb",
    },
];


export default RestuarantList;

// const RestaurantListScreen = () => {
//     const navigation = useNavigation<NavigationProp>();

//     const renderItem = ({ item }: any) => (
//         <TouchableOpacity
//             style={{
//                 backgroundColor: "white",
//                 marginBottom: 10,
//                 borderRadius: 8,
//                 shadowOpacity: 0.1,
//                 shadowRadius: 4,
//                 padding: 10,
//             }}
//             onPress={() =>
//                 navigation.navigate("RestaurantDetails", {
//                     id: item.id,
//                     name: item.name,
//                     address: item.address,
//                     rating: item.rating,
//                     discount: item.discount,
//                     origin: item.origin,
//                     imageUrl: item.imageUrl,
//                 })
//             }
//         >
//             <Image
//                 source={{ uri: item.imageUrl }}
//                 style={{ height: 150, borderRadius: 8 }}
//             />
//             <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.name}</Text>
//             <Text style={{ color: "gray" }}>{item.address}</Text>
//             <Text style={{ color: "green" }}>⭐ {item.rating}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <FlatList
//             data={RestuarantList}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             contentContainerStyle={{ padding: 16 }}
//         />
//     );
// };

// export default RestaurantListScreen;

