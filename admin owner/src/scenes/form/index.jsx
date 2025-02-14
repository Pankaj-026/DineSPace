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
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import url from "../../constant/url";

const RestaurantDetails = () => {
  const [status, setStatus] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
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

  const updateStatus = async () => {
    try {
      const response = await fetch(`${url}/api/restaurants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setSnackbarMessage("Status updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating status:", error);
      setSnackbarMessage("Failed to update status");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
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
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cuisine (comma-separated)"
          value={formData.cuisine.join(", ")}
          onChange={(e) => handleChange("cuisine", e.target.value.split(", "))}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Open Time"
          value={formData.timings.open}
          onChange={(e) => handleChange("timings.open", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Close Time"
          value={formData.timings.close}
          onChange={(e) => handleChange("timings.close", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Table Price"
          value={formData.tablePrice}
          onChange={(e) => handleChange("tablePrice", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Popular Dishes (comma-separated)"
          value={formData.popularDishes.join(", ")}
          onChange={(e) =>
            handleChange("popularDishes", e.target.value.split(", "))
          }
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          value={formData.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Google Rating"
          value={formData.googleRating}
          onChange={(e) => handleChange("googleRating", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Discount"
          value={formData.discount}
          onChange={(e) => handleChange("discount", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Origin"
          value={formData.origin}
          onChange={(e) => handleChange("origin", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Number"
          value={formData.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Owner Gmail"
          value={formData.restaurantOwnerGmail}
          onChange={(e) => handleChange("restaurantOwnerGmail", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amenities (comma-separated)"
          value={formData.amenities.join(", ")}
          onChange={(e) =>
            handleChange("amenities", e.target.value.split(", "))
          }
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          value={formData.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="More Images (comma-separated)"
          value={formData.moreImages.join(", ")}
          onChange={(e) =>
            handleChange("moreImages", e.target.value.split(", "))
          }
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Menu Images (comma-separated)"
          value={formData.menuImages.join(", ")}
          onChange={(e) =>
            handleChange("menuImages", e.target.value.split(", "))
          }
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
              sx={{ mt: 1 }}>
              <MenuItem value={true}>Open</MenuItem>
              <MenuItem value={false}>Close</MenuItem>
            </Select>
          </FormControl>
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
          onClose={() => setOpenSnackbar(false)}>
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}>
            {snackbarMessage}
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
