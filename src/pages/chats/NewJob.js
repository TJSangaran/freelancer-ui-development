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
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { FormikProvider, useFormik, Form } from "formik";
import { useChannelStateContext } from 'stream-chat-react'
import { useAuth } from "../../context/AuthContext";
import { LoadingButton } from '@mui/lab';
import useFetch from '../../hooks/useFetch';

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

function NewJob({ closeJobModal }) {
    var _c = useChannelStateContext('ChannelHeader'), channel = _c.channel
    const { user, customFetch } = useAuth();
    const [userBalance, userBalanceLoading] = useFetch('/user/spendableBalance')

    const initialValues = {
        title: "",
        body: "",
        price: 0,
        days: 1,
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        body: Yup.string().required("Description is required"),
        price: Yup.number().min(0).max(userBalance.spendableBalance, `The spendable balance is not enough. Your current total balance is ${userBalance.balance}$ and the spendable balance is ${userBalance.spendableBalance}`).required("Required"),
        days: Yup.number().positive().integer().required("Required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            const headers = {
                "Content-Type": "application/json"
            }
            const body = JSON.stringify({
                ...values,
                errandId: channel.id.split("-").find((id)=>id!==user._id),
                jobPosterId: user._id,
                status: "initiated"
            })
            const response = await (await customFetch(`/jobs`,{ method: 'POST',headers, body})).json()
            channel &&
            await channel.sendMessage({
                attachments:[
                    {
                        type: "job",
                        jobId: response._id
                    }
                ]
            });
            closeJobModal()
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
                        onClick={closeJobModal}
                        aria-label="add to favorites"
                    >
                        <CloseIcon />
                    </IconButton>
                }
                title={
                    <Typography variant="h6" sx={{ borderRadius: 4 }}>
                        Create New Job
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="title"
                                    required
                                    size="small"
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    variant="standard"
                                    {...getFieldProps("title")}
                                    error={Boolean(
                                        touched.title && errors.title
                                    )}
                                    helperText={touched.title && errors.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    size="small"
                                    multiline
                                    rows={7}
                                    fullWidth
                                    id="body"
                                    label="Description"
                                    name="body"
                                    variant="standard"
                                    {...getFieldProps("body")}
                                    error={Boolean(
                                        touched.body &&
                                            errors.body
                                    )}
                                    helperText={
                                        touched.body &&
                                        errors.body
                                    }
                                />
                            </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                name="price"
                                required
                                size="small"
                                fullWidth
                                id="price"
                                label="Price"
                                variant="standard"
                                {...getFieldProps("price")}
                                error={Boolean(
                                    touched.price && errors.price
                                )}
                                helperText={
                                    touched.price && errors.price
                                }
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                size="small"
                                fullWidth
                                id="days"
                                label="Days needed"
                                name="days"
                                variant="standard"
                                {...getFieldProps("days")}
                                error={Boolean(
                                    touched.days && errors.days
                                )}
                                helperText={touched.days && errors.days}
                            />
                        </Grid>
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
                                disabled={userBalanceLoading}
                            >
                                Create Job
                            </LoadingButton>
                            <LoadingButton
                                onClick={closeJobModal}
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

export default NewJob;
