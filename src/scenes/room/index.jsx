import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Header from "../../components/Header";
import { useEffect, useState} from "react";

const Room = () => {  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  console.log(selectedRows);
 
  const reserveRoom = async () => {
      const numRoom = await fetch('/api/getRoom', {
          method: 'GET',
          headers: {
              'Content-type': 'application/json'
          },
      })
      let rooms = numRoom.json();
      rooms.then((val) => {
          console.log("values returned:", val);
          setItems(val);
      }).catch((err) => {
          console.log("There's an error");
      })
  }

  useEffect(()=>{
    reserveRoom();
  },[]);
  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "max_guests",
      headerName: "Max Guests",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "max_rooms",
      headerName: "Max Room",
      flex: 1,
    },
    {
      headerName:"Delete",
      flex: 1,
      sortable:false,
      renderCell: () => {
        const handleClick = ()=>{
          console.log("hello");
        }
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
            onClick={handleClick}
          >
            Delete
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Room" subtitle="Managing the Rooms" />
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
        <DataGrid checkboxSelection rows={items} columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Room;
