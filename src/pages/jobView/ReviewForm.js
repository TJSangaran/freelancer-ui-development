import React from "react";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    Chip,
    Tooltip,
    Stack,
    Button,
    Grid,
    TextField,
    Rating
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { FormikProvider, useFormik, Form } from "formik";
import { LoadingButton } from '@mui/lab';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
};

function ReviewForm({ closeReviewModal, addJobReview}) {
    const initialValues = {
        rating: 1,
        reviewMessage: ""
    };
    const validationSchema = Yup.object().shape({
        rating: Yup.number().min(1).max(5).required("Required"),
        reviewMessage: Yup.string(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            await addJobReview(values)
            closeReviewModal()
            setSubmitting(false)
        },
    });
    const {
        errors,
        touched,
        values,
        isSubmitting,
        setSubmitting,
        handleChange,
        handleSubmit,
        setFieldValue,
        getFieldProps,
        resetForm,
        setFieldError,
    } = formik;

    return (
        <Card sx={style}>
            <CardHeader
                action={
                    <IconButton
                        onClick={closeReviewModal}
                        aria-label="add to favorites"
                    >
                        <CloseIcon />
                    </IconButton>
                }
                title={
                    <Typography variant="h6" sx={{ borderRadius: 4 }}>
                        Add Rating
                    </Typography>
                }
            />
            <CardContent>
                <FormikProvider value={formik}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ m: 1, mb: 0 }}
                    >
                        <Grid item xs={6} sm={6}>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="price"
                                value={2}
                                id="rating"
                                label="Rating"
                                {...getFieldProps("rating")}
                                error={Boolean(
                                    touched.rating && errors.rating
                                )}
                                helperText={
                                    touched.rating && errors.rating
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size="small"
                                multiline
                                rows={3}
                                fullWidth
                                id="reviewMessage"
                                label="Review"
                                name="reviewMessage"
                                variant="standard"
                                {...getFieldProps("reviewMessage")}
                                error={Boolean(
                                    touched.reviewMessage &&
                                        errors.reviewMessage
                                )}
                                helperText={
                                    touched.reviewMessage &&
                                    errors.reviewMessage
                                }
                            />
                        </Grid>

                        <Stack
                            direction={"row"}
                            alignItems="right"
                            justifyContent={"right"}
                            mt={4}
                        >
                            <LoadingButton
                                type="submit"
                                variant="outlined"
                                sx={{ borderRadius: 4 }}
                                loading={isSubmitting}
                            >
                                Submit Rating
                            </LoadingButton>
                            <LoadingButton
                                onClick={closeReviewModal}
                                variant="outlined"
                                sx={{ ml: 2, borderRadius: 4 }}
                            >
                                Close
                            </LoadingButton>
                        </Stack>
                    </Box>
                </FormikProvider>
            </CardContent>
        </Card>
    );
}

export default ReviewForm;
