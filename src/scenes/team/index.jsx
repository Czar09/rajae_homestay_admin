import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);
  const reserveRoom = async () => {
    const numRoom = await fetch('/api/getBookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    })
    let rooms = numRoom.json();
    rooms.then((val) => {
      setItems(val);
    }).catch((err) => {
      console.log("There's an error");
    })
  }
  const handleClik = () => {
    console.log("hello");
  }

  useEffect(() => {
    reserveRoom();
  }, []);
  const columns = [
    { field: "booking_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "checkintimestamp",
      headerName: "Check In",
      flex: 1,
    },
    {
      field: "checkouttimestamp",
      headerName: "Check Out",
      flex: 1,
    },
    {
      field: "booking_timestamp",
      headerName: "Booking Date",
      flex: 1,
    },
    {
      field: "num_of_guests",
      headerName: "Number Of Guests",
      type: "number",
      flex: 1,
    },
    {
      field: "num_of_rooms",
      headerName: "Number Of Rooms",
      type: "number",
      flex: 1,
    },
    {
      field: "room_type",
      headerName: "Room Type",
      flex: 1,
    },
    {
      headerName: "Delete",
      flex: 1,
      sortable: false,
      renderCell: () => {

        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              colors.redAccent[600]
            }
            borderRadius="4px"
            onClick={handleClik}
          >
            Delete
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Bookings" subtitle="Manage the Bookings" />
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
            backgroundColor: colors.blueAccent[700],
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
        }}
      >
        <DataGrid checkboxSelection rows={items} columns={columns} getRowId={(row) => row.booking_id} onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = items.filter((item) =>
            selectedIDs.has(item.booking_id.toString())
          );
          console.log(selectedRowData);
        }} />
      </Box>
    </Box>
  );
};

export default Team;
