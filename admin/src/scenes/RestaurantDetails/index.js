import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import url from "../../constant/url";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${url}/api/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${url}/api/bookings/book/restaurant/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        console.log(data?.bookings);
        setBookings(data?.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchRestaurant();
    fetchBookings();
  }, [id]);

  if (!restaurant) {
    return (
      <Typography
        variant="h4"
        textAlign="center">
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "auto" }}>
      {/* Restaurant Banner */}
      <Card sx={{ mb: 3, position: "relative", borderRadius: 3, boxShadow: 5 }}>
        <CardMedia
          component="img"
          height="300"
          image={restaurant.imageUrl || "https://via.placeholder.com/800"}
          alt={restaurant.name}
          sx={{ borderRadius: "12px 12px 0 0", objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom>
            {restaurant.name}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary">
            {restaurant.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Restaurant Details */}
      <Grid
        container
        spacing={3}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={8}>
          <Card sx={{ mb: 3, p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom>
              <LocationOnIcon sx={{ color: "red", mr: 1 }} />
              Address: {restaurant.address}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <PhoneIcon sx={{ color: "green", mr: 1 }} />
              Contact: {restaurant.contactNumber}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <EmailIcon sx={{ color: "blue", mr: 1 }} />
              Owner Email: {restaurant.restaurantOwnerGmail}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <StarIcon sx={{ color: "gold", mr: 1 }} />
              Rating: {restaurant.rating} / 5 ⭐
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <StarIcon sx={{ color: "gold", mr: 1 }} />
              Google Rating: {restaurant.googleRating} / 5 ⭐
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <RestaurantMenuIcon sx={{ color: "brown", mr: 1 }} />
              Cuisine: {restaurant.cuisine.join(", ")}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <AccessTimeIcon sx={{ color: "purple", mr: 1 }} />
              Timings: {restaurant.timings.open} - {restaurant.timings.close}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <DiscountIcon sx={{ color: "orange", mr: 1 }} />
              Discount:{" "}
              {restaurant.discount
                ? `${restaurant.discount}% off`
                : "No Discount"}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <PriceCheckIcon sx={{ color: "green", mr: 1 }} />
              Table Price: ₹{restaurant.tablePrice}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              {restaurant.status ? (
                <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
              ) : (
                <CancelIcon sx={{ color: "red", mr: 1 }} />
              )}
              Status: {restaurant.status ? "Open" : "Closed"}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <CalendarTodayIcon sx={{ color: "blue", mr: 1 }} />
              Created At: {new Date(restaurant.createdAt).toLocaleString()}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom>
              <CalendarTodayIcon sx={{ color: "blue", mr: 1 }} />
              Updated At: {new Date(restaurant.updatedAt).toLocaleString()}
            </Typography>
          </Card>

          {/* Amenities */}
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom>
              🏢 Amenities
            </Typography>
            {restaurant.amenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity}
                sx={{ m: 0.5 }}
              />
            ))}
          </Card>

          {/* Bookings */}
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mt: 3 }}>
            <Typography
              variant="h6"
              gutterBottom>
              📅 Bookings
            </Typography>
            {bookings.length === 0 ? (
              <Typography
                variant="body1"
                textAlign="center">
                No bookings available
              </Typography>
            ) : (
              <div>
                {bookings.map((booking) => (
                  <div key={booking._id}>
                    <p>Name: {booking.userName}</p>
                    <p>
                        Date: {booking.bookingDate}
                    </p>
                    <p>
                        Time: {booking.bookingTime}
                    </p>
                    <p>
                        Number of Guest: {booking.numberOfGuests}
                    </p>
                    <p>
                        Phone Number: {booking.phoneNumber}
                    </p>
                    <p>
                        Booking Type: {booking.bookingType}
                    </p>
                    <p>
                        Special Request: {booking.specialRequests}
                    </p>
                    <p>
                        Status: {booking.Status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Grid>

        {/* Right Section - Images & Popular Dishes */}
        <Grid
          item
          xs={12}
          md={4}>
          {/* Popular Dishes */}
          <Card sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom>
              🍽️ Popular Dishes
            </Typography>
            {restaurant.popularDishes.map((dish, index) => (
              <Chip
                key={index}
                label={dish}
                sx={{ m: 0.5 }}
              />
            ))}
          </Card>

          {/* More Images */}
          <Card sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom>
              📷 More Images
            </Typography>
            {restaurant.moreImages.length > 0 ? (
              restaurant.moreImages.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  height="150"
                  image={image}
                  alt={`Restaurant image ${index + 1}`}
                  sx={{ m: 1, borderRadius: 2, boxShadow: 2 }}
                />
              ))
            ) : (
              <Typography>No additional images available.</Typography>
            )}
          </Card>

          {/* Menu Images */}
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom>
              📖 Menu
            </Typography>
            {restaurant.menuImages.map((menu, index) => (
              <CardMedia
                key={index}
                component="img"
                height="150"
                image={menu}
                sx={{ m: 1, borderRadius: 2 }}
              />
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantDetails;
