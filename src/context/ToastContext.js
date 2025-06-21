import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'info', // can be 'error', 'warning', 'info', 'success'
    });

    const showToast = (message, severity = 'info') => {
        setToast({ open: true, message, severity });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast({ ...toast, open: false });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                open={toast.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }} variant="filled">
                    {toast.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
} 