import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const AlertCompleteCart = () => {
    return (
        <Alert severity="success" variant='outlined'>
            <AlertTitle>Success</AlertTitle>
            Thank you for your purchase — <strong>it's already completed!</strong>
        </Alert>
    )
}

export default AlertCompleteCart