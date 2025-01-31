import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import url from "../../constant/url";
import BlockIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DeleteIcon from "@mui/icons-material/Delete";

const Restaurants = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${url}/api/restaurants`); // Assuming backend runs on the same domain
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data);

        const transformedData = data.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.restaurantOwnerGmail,
          verified: user.contactNumber,
          access: user.status ? "Open" : "Closed",
        }));
        setUserData(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a restaurant
  const deleteRestaurant = async (id) => {
    try {
      const response = await fetch(`${url}/api/restaurants/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete restaurant");
      }

      // After successful deletion, update the UI by filtering out the deleted restaurant
      setUserData((prevData) => prevData.filter((restaurant) => restaurant.id !== id));
      alert("Restaurant deleted successfully!");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Failed to delete restaurant.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex:1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "verified",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "Open"
                ? colors.greenAccent[600]
                : colors.yellowAccent[600]
            }
            borderRadius="4px">
            {access === "Closed" && <BlockIcon />}
            {access === "Open" && <RestaurantIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.redAccent[600]}
            borderRadius="4px"
            onClick={() => deleteRestaurant(row.id)} // Trigger delete on click
            sx={{ cursor: "pointer" }}>
            <DeleteIcon />
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Managing the Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}>
        <DataGrid rows={userData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Restaurants;
