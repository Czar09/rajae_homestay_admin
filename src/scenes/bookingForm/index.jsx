import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const BookingForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const checkinDate = new Date(formattedStartDate);
    const checkoutDate = new Date(formattedEndDate);
    const checkInTimestamp = Math.floor(checkinDate.getTime() / 1000);
    const checkOutTimestamp = Math.floor(checkoutDate.getTime() / 1000);



    const handleFormSubmit = async (values) => {
        const numRoom = await fetch('/api/confirmRoom', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "email": String(values.mail),
                "name": String(values.Name),
                "phoneNumber": String(values.contact),
                "checkInTimestamp": checkInTimestamp,
                "checkOutTimestamp": checkOutTimestamp,
                "bookingTimestamp": values.booking_timestamp,
                "numOfGuests": Number(values.num_of_guests),
                "numOfRooms": Number(values.num_of_rooms),
                "roomType": String(values.roomName)
            })
        })
        if (numRoom.status === 200) {
            toast.success("Booking Added");
        }
        else {
            toast.error("Something went wrong");
        }
    };
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

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
            <Header title="CREATE Booking" subtitle="Create a New Booking" />

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
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Name}
                                name="Name"
                                error={!!touched.Name && !!errors.Name}
                                helperText={touched.Name && errors.Name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.mail}
                                name="mail"
                                error={!!touched.mail && !!errors.mail}
                                helperText={touched.mail && errors.mail}
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
                                name="room_type"
                                error={!!touched.room_type && !!errors.room_type}
                                helperText={touched.room_type && errors.room_type}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.contact}
                                name="contact"
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Number of Rooms"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.num_of_rooms}
                                name="num_of_rooms"
                                error={!!touched.num_of_rooms && !!errors.num_of_rooms}
                                helperText={touched.num_of_rooms && errors.num_of_rooms}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Number of Guests"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.num_of_guests}
                                name="num_of_guests"
                                error={!!touched.num_of_guests && !!errors.num_of_guests}
                                helperText={touched.num_of_guests && errors.num_of_guests}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Booking Timestamp"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.booking_timestamp}
                                name="contact"
                                error={!!touched.num_of_guests && !!errors.num_of_guests}
                                helperText={touched.num_of_guests && errors.num_of_guests}
                                sx={{ gridColumn: "span 2" }}
                                disabled
                            />
                            <DateRangePicker
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                onChange={handleSelect}
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
    Name: yup.string().required(" name is required"),
    mail: yup.string().email("invalid email").required("required"),
    room_type: yup.string().required("room type is required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    num_of_rooms: yup.string().required("required"),
    num_of_guests: yup.string().required("required"),

});
const initialValues = {
    Name: "",
    mail: "",
    room_type: "",
    num_of_guests: 1,
    num_of_rooms: 1,
    contact: "",
    booking_timestamp: Math.floor(Date.now() / 1000),
};

export default BookingForm;
