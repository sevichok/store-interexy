import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const AlertEmptyCart = () => {
    return (
        <Alert severity="info" variant='outlined'>
            <AlertTitle>Info</AlertTitle>
            Your cart is empty — <strong>pick products to purchase an order!</strong>
        </Alert>
    )
}

export default AlertEmptyCart