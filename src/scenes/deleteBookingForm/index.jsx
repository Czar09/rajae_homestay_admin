import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteBooking = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    const numRoom = await fetch('/api/confirmRoom', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "id": Number(values.id),
        "name": String(values.roomName),
        "max_guests": String(values.max_guests),
        "max_rooms": String(values.max_rooms),
        "roomType": String(values.roomName)
      })
    })
    if (numRoom.status == 200) {
      toast.success("Room Added");
    }
    else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Box m="20px">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header title="CREATE Room" subtitle="Create a New Room" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Room Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomId}
                name="roomId"
                error={!!touched.roomId && !!errors.roomId}
                helperText={touched.roomId && errors.roomId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Room Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomName}
                name="roomName"
                error={!!touched.roomName && !!errors.roomName}
                helperText={touched.roomName && errors.roomName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Max guests"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.max_guests}
                name="max_guests"
                error={!!touched.max_guests && !!errors.max_guests}
                helperText={touched.max_guests && errors.max_guests}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Max Rooms"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.max_rooms}
                name="max_rooms"
                error={!!touched.max_rooms && !!errors.rooms}
                helperText={touched.max_rooms && errors.max_rooms}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  roomId: yup.string().required("required"),
  roomName: yup.string().required("required"),
  max_guests: yup.string().required("required"),
  max_rooms: yup.string().required("required"),

});
const initialValues = {
  roomId: "",
  roomName: "",
  max_guests: "",
  max_rooms: "",
};

export default DeleteBooking;
