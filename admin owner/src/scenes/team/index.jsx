import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import url from "../../constant/url";
import { Link } from "react-router-dom";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const id = localStorage.getItem("restaurantId");
        const cleanId = id.replace(/"/g, "");
        console.log(`${url}/api/bookings/book/restaurant/${cleanId}`);
        const response = await fetch(
          `${url}/api/bookings/book/restaurant/${String(cleanId)}`
        ); // Assuming backend runs on the same domain
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data);
        console.log("dd");

        const transformedData = data.bookings.map((bookings) => ({
          id: bookings._id,
          userName: bookings.userName,
          phoneNumber: bookings.phoneNumber,
          bookingDate: bookings.bookingDate,
          bookingTime: bookings.bookingTime,
          numberOfGuests: bookings.numberOfGuests,
          details: "Details",
        }));
        setUserData(transformedData);
        // console.log(await response.json());
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "userName",
      headerName: "UserName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "numberOfGuests",
      headerName: "Party",
      flex: 1,
    },
    {
      field: "bookingDate",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "bookingTime",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "Details",
      headerName: "Details",
      flex: 1,
      renderCell: ({ id }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px">
            <Typography
              color={colors.grey[100]}
              sx={{ ml: "5px", cursor: "pointer" }}>
              <Link
                to={`/BookingsDetails/${id}`}
                style={{ textDecoration: "none", color: "white" }}>
                Details
              </Link>
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="BOOKINGS"
        subtitle="Managing the Bookings"
      />
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
        <DataGrid
          rows={userData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;
