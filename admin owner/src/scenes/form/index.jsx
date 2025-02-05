import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import url from "../../constant/url";
import Header from "../../components/Header";

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cuisine: "",
    timings: { open: "", close: "" },
    opens: "",
    closes: "",
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
    tablePrice: "",
  });

  const [localImage, setLocalImage] = useState(null);

  const theme = useTheme();

  const handleChange = (fieldPath, value) => {
    const keys = fieldPath.split(".");
    setFormData((prevState) => {
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

  const pickImage = async (imageType) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${url}/api/img/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      const imageUrl = data.data.secure_url;

      if (imageType === "main") {
        handleChange("imageUrl", imageUrl);
      } else if (imageType === "more") {
        setFormData((prev) => ({
          ...prev,
          moreImages: [...prev.moreImages, imageUrl],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          menuImages: [...prev.menuImages, imageUrl],
        }));
      }
    };
  };

  const handleSubmit = async () => {
    try {
      const processedData = {
        ...formData,
        opens: formData.opens ? parseInt(formData.opens) : null,
        closes: formData.closes ? parseInt(formData.closes) : null,
        rating: formData.rating ? parseFloat(formData.rating) : null,
        googleRating: formData.googleRating
          ? parseFloat(formData.googleRating)
          : null,
        discount: formData.discount ? parseFloat(formData.discount) : null,
        cuisine: formData.cuisine.split(","),
        popularDishes: formData.popularDishes.split(","),
        amenities: formData.amenities.split(","),
      };
      // console.log(processedData);

      const response = await fetch(`${url}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      // console.log(await response);
      // const result = await response.json();
      // console.log(await result);
      if (response.ok) {
        alert("Restaurant added successfully!");
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
          tablePrice: "",
        });
        setLocalImage(null);
      } else {
        alert("Failed to add restaurant");
      }
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Submission Error");
    }
  };

  const sxRepeat = {
    "& .MuiInputLabel-root": {
      color: theme.palette.neutral.main, // keeps label color consistent
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.neutral.main, // keeps the border visible when focused
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.main, // change border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.neutral.main, // border color when focused
      },
      "&.Mui-focused": {
        backgroundColor: theme.palette.background.default, // change background color on focus if needed
      },
    },
  };

  return (
    <Box
      m="20px"
      p="20px">
      <Header
        title="RESTARANTS"
        subtitle="Adding the Restaurants"
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        marginTop={2}>
        
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        
        <TextField
          label="Cuisine (comma-separated)"
          value={formData.cuisine}
          onChange={(e) => handleChange("cuisine", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Open Time"
          value={formData.timings.open}
          onChange={(e) => handleChange("timings.open", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Close Time"
          value={formData.timings.close}
          onChange={(e) => handleChange("timings.close", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Opens (1-24)"
          value={formData.opens}
          onChange={(e) => handleChange("opens", e.target.value)}
          type="number"
          variant="outlined"
          fullWidth
          sx={sxRepeat}
          inputProps={{ min: 1, max: 24 }}
        />
        <TextField
          label="Closes (1-24)"
          value={formData.closes}
          onChange={(e) => handleChange("closes", e.target.value)}
          type="number"
          variant="outlined"
          fullWidth
          sx={sxRepeat}
          inputProps={{ min: 1, max: 24 }}
        />
        <TextField
          label="Popular Dishes (comma-separated)"
          value={formData.popularDishes}
          onChange={(e) => handleChange("popularDishes", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Rating"
          value={formData.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Google Rating"
          value={formData.googleRating}
          onChange={(e) => handleChange("googleRating", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Discount"
          value={formData.discount}
          onChange={(e) => handleChange("discount", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Origin"
          value={formData.origin}
          onChange={(e) => handleChange("origin", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Contact Number"
          value={formData.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Owner Gmail"
          value={formData.restaurantOwnerGmail}
          onChange={(e) => handleChange("restaurantOwnerGmail", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Amenities (comma-separated)"
          value={formData.amenities}
          onChange={(e) => handleChange("amenities", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Price"
          value={formData.tablePrice}
          onChange={(e) => handleChange("tablePrice", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
      </Box>

      {/* Image Pickers */}
      <Box
        display="flex"
        gap={2}
        justifyContent="center"
        marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => pickImage("main")}>
          Pick Main Image
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => pickImage("more")}>
          Pick More Images
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => pickImage("menu")}>
          Pick Menu Images
        </Button>
      </Box>

      {/* Image Preview */}
      {localImage && (
        <img
          src={localImage}
          alt="Selected"
          width="100"
          height="100"
          style={{ marginTop: "16px", display: "block", margin: "0 auto" }}
        />
      )}

      {/* Submit Button */}
      <Box
        display="flex"
        justifyContent="center"
        margin={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}>
          Add Restaurant
        </Button>
      </Box>
    </Box>
  );
};

export default AddRestaurantForm;
