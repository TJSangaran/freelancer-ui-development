import React from 'react'
import { Grid, Dialog, TextField, DialogTitle, Button, DialogActions } from '@mui/material'
import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const Deposit = ({ open, setOpen }) => {
    const hanldeClose = () => {
        setOpen(false)
    }
    const { user, customFetch } = useAuth()
    const { showToast } = useToast()
    const initialValues = {
        userId: user._id,
        amount: ''
    }

    const validationSchema = Yup.object().shape({
        userId: Yup.string().required('Required'),
        amount: Yup.number().typeError('Not a valid number').positive('Not a valid number').required('Required')
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            customFetch('/transactions/deposit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
                .then((response) => {
                    if (response.ok) {
                        setSubmitting(false)
                        resetForm()
                        showToast("Deposit successful", "success");
                    } else {
                        throw response;
                    }
                })
                .catch(async (err) => {
                    setSubmitting(false);
                    if (err instanceof Response) {
                        const errorResponse = await err.json();
                        showToast(errorResponse.error, 'error');
                    } else {
                        showToast(err.message, 'error');
                    }
                })
        }
    })
    const { errors, touched, getFieldProps, handleSubmit, isSubmitting } = formik;


    return (
        <Dialog
            open={open}
            onClose={hanldeClose}
            scroll="body"
            maxWidth="sm"
            sx={{ m: 1, p: 2 }}
        >
            <DialogTitle>
                Deposit to your account
            </DialogTitle>
            <FormikProvider value={formik} >
                <Form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        <Grid item xs={12} >
                            <TextField
                                size="small"
                                fullWidth
                                type='number'
                                label="Amount"
                                variant="standard"
                                {...getFieldProps("amount")}
                                error={Boolean(touched.amount && errors.amount)}
                                helperText={touched.amount && errors.amount}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Loading...' : 'Deposit'}
                        </Button>
                    </DialogActions>
                </Form>
            </FormikProvider>
        </Dialog>
    )
}
export default Deposit; 