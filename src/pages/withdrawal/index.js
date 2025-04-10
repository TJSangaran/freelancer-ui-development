import React, {useState, useEffect} from 'react'
import { Card, Grid, Dialog, Typography, TextField, DialogTitle, Button, DialogActions } from '@mui/material'
import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useAuth } from '../../context/AuthContext';



const Withdrawal = ({open, setOpen}) => {
    const hanldeClose = () => {
        setOpen(false)
    }
    const {user, customFetch} = useAuth()
    const initialValues = {
        userId: user._id,
        ammount: ''
    }

    const validationSchema = Yup.object().shape({
        userId: Yup.string().required('Required'),
        ammount: Yup.number().typeError('Not a valid number').positive('Not a valid number').required('Required')
    })
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            console.log(values)
            customFetch('/withdrawalRequests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
                .then((response) => {
                    if (response.status === 201 || response.status === 200) {
                        setSubmitting(false)
                        resetForm()
                    } else {
                        setSubmitting(false)
                    }
                })
                .catch(err => {
                    setSubmitting(false)
                })
        }
    })
    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm, setFieldError } = formik;


    return(
        <Dialog 
            open={open} 
            onClose={hanldeClose}
            scroll="body"
            maxWidth="sm"
            sx={{m: 1, p: 2}}
        >
            <DialogTitle >
                <Typography variant='h5'>
                    Request for withdrawal
                </Typography>
            </DialogTitle>
            <FormikProvider value={formik} >
                <Form onSubmit={handleSubmit} sx={{ mt: 1}}>
                    <Grid container spacing={2} sx={{p: 2}}>
                        <Grid item xs={12} >
                            <TextField
                                size="small"
                                fullWidth
                                type='number'
                                label="Amount"
                                variant="standard"
                                {...getFieldProps("ammount")}
                                error={Boolean(touched.ammount && errors.ammount)}
                                helperText={touched.ammount && errors.ammount}
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
                            {isSubmitting ? 'Loading...' : 'Send'}
                        </Button>
                    </DialogActions>
                </Form>
            </FormikProvider>
        </Dialog>
    )
}
export default Withdrawal