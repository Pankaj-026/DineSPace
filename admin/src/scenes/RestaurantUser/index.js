import React, { useState } from "react";
import { Button, TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { useTheme } from "@mui/system";
import url from "../../constant/url";
import Header from "../../components/Header";

const RestaurantUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verified: false,
    isLogedin: false,
    isAdmin: false,
    isOwner: true,
    restaurantId: null,
  });

  const theme = useTheme();

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${url}/api/users/restaurant/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          verified: true,
          isLogedin: false,
          isAdmin: false,
          isOwner: true,
          restaurantId: null,
        });
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration Error");
    }
  };

  const sxRepeat = {
    "& .MuiInputLabel-root": { color: theme.palette.neutral.main },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: theme.palette.neutral.main },
      "&:hover fieldset": { borderColor: theme.palette.text.main },
      "&.Mui-focused fieldset": { borderColor: theme.palette.neutral.main },
    },
  };

  return (
    <Box m="20px" p="20px">
      <Header title="USER REGISTRATION" subtitle="Create a new restsuat account" />
      <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          variant="outlined"
          fullWidth
          sx={sxRepeat}
        />
        <FormControlLabel
          control={<Checkbox checked={formData.isOwner} onChange={(e) => handleChange("isOwner", e.target.checked)} />}
          label="Register as Restaurant Owner"
        />
      </Box>

      <Box display="flex" justifyContent="center" margin={4}>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantUser;