import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const AlertAuth = () => {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something wrong with your credentials — <strong>try one more time!</strong>
        </Alert>
    )
}

export default AlertAuth