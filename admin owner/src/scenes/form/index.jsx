import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Select,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import url from "../../constant/url";

const RestaurantDetails = () => {
  const [status, setStatus] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const id = localStorage.getItem("restaurantId").replace(/"/g, "");

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [restaurant, setRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cuisine: [],
    timings: { open: "", close: "" },
    tablePrice: "",
    popularDishes: [],
    rating: "",
    googleRating: "",
    discount: "",
    origin: "",
    imageUrl: "",
    moreImages: [],
    menuImages: [],
    amenities: [],
    location: "",
    restaurantOwnerGmail: "",
    contactNumber: "",
    description: "",
    status: true,
    categories: {},
  });

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`${url}/api/restaurants/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }
        const data = await response.json();
        setRestaurant(data);
        setFormData(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimingsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      timings: {
        ...prev.timings,
        [field]: value,
      },
    }));
  };

  const updateStatus = async () => {
    try {
      const response = await fetch(`${url}/api/restaurants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // use the boolean directly
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${url}/api/restaurants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Restaurant updated successfully!");
        navigate(-1);
      } else {
        alert("Failed to update restaurant");
      }
    } catch (error) {
      console.error("Error updating restaurant:", error);
      alert("Submission Error");
    }
  };

  if (!restaurant) {
    return <Typography>Loading...</Typography>;
  }

  const renderTextField = (label, field, type = "text", multiline = false) => (
    <TextField
      label={label}
      value={formData[field]}
      onChange={(e) =>
        handleChange(
          field,
          type === "array" ? e.target.value.split(", ") : e.target.value
        )
      }
      variant="outlined"
      fullWidth
      margin="normal"
      multiline={multiline}
    />
  );

  return (
    <Box
      m="20px"
      pb="20px">
      <Typography
        variant="h2"
        style={{ fontWeight: 600 }}
        color={colors.primary[100]}>
        Restaurant Details
      </Typography>
      <Box mt="20px">
        {renderTextField("Name", "name")}
        {renderTextField("Address", "address")}
        {renderTextField("Cuisine (comma-separated)", "cuisine", "array")}
        <TextField
          label="Open Time"
          value={formData.timings.open}
          onChange={(e) => handleTimingsChange("open", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Close Time"
          value={formData.timings.close}
          onChange={(e) => handleTimingsChange("close", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {renderTextField("Table Price", "tablePrice")}
        {renderTextField(
          "Popular Dishes (comma-separated)",
          "popularDishes",
          "array"
        )}
        {renderTextField("Rating", "rating")}
        {renderTextField("Google Rating", "googleRating")}
        {renderTextField("Discount", "discount")}
        {renderTextField("Origin", "origin")}
        {renderTextField("Contact Number", "contactNumber")}
        {renderTextField("Owner Gmail", "restaurantOwnerGmail")}
        {renderTextField("Description", "description", "text", true)}
        {renderTextField("Amenities (comma-separated)", "amenities", "array")}
        {renderTextField("Location", "location")}
        {renderTextField("Image URL", "imageUrl")}
        {renderTextField(
          "More Images (comma-separated)",
          "moreImages",
          "array"
        )}
        {renderTextField(
          "Menu Images (comma-separated)",
          "menuImages",
          "array"
        )}

        <Box mt={2}>
          <Select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value === "true" || e.target.value === true)
            }
            sx={{ width: "100%", mt: 1 }}>
            <MenuItem value={true}>Open</MenuItem>
            <MenuItem value={false}>Close</MenuItem>
          </Select>
        </Box>

        <Box
          display="flex"
          gap={2}
          mt={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={updateStatus}>
            Update Status
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          placeholder="Status"
          onClose={() => setOpenSnackbar(false)}>
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success">
            Status updated successfully!
          </Alert>
        </Snackbar>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: "20px" }}>
          Update Restaurant
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)}
          sx={{ mt: "20px", ml: "10px" }}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantDetails;
