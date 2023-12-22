import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ======= Material UI ======= //
import { Typography, TextField, Button, Checkbox, Container, Box } from '@mui/material'
import { ContentStyle, ElemStyle, HeaderStyle, PageStyle } from './mui'

// ======= Store ======= //
import { signinUser } from './store/auth.actions'
import { useAppDispatch } from 'store'

// ======= Types ======= //
import { LoginDto } from './types/login-dto.type'
import AlertAuth from '../../components/alert-auth'

export const LoginPage = () => {
    const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)
    const [data, setData] = useState<LoginDto>({ email: '', password: '' })
    const [error, setError] = useState<boolean>(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        const loginData: LoginDto = {
            email: data.email,
            password: data.password
        }

        dispatch(signinUser({ data: loginData })).then(({ meta }) => {
            if (meta.requestStatus === "fulfilled") {
                setData({ email: '', password: '' })
                navigate('/store', { replace: true });
            }
            if (meta.requestStatus === 'rejected') {
                setError(true)
            }
        }
        )
    }

    const handleReset = () => {
        setError(false)
        setData({ email: '', password: '' })
    }

    return (
        <Container className='sign-page' sx={PageStyle}>
            <Box className='sign-header' sx={HeaderStyle}>
                <Box className='sign-header-elem' sx={ElemStyle}>
                    <Typography variant='h6' sx={{ borderBottom: '2px #eeeef0 solid' }}>
                        LOGIN
                    </Typography>
                </Box>
                <Box className='sign-header-elem' sx={ElemStyle}>
                    <Link to='/auth/register'>
                        <Typography variant='h6'>SIGNUP</Typography>
                    </Link>
                </Box>
            </Box>
            <Box className='sign-content' sx={ContentStyle}>
                <Typography variant='h3'>Welcome Back</Typography>
                <Typography variant='h6'>Hello Again! Sign up to continue!</Typography>
                <TextField
                    sx={{ width: '300px' }}
                    margin={'dense'}
                    size='small'
                    label='Email'
                    value={data.email}
                    onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                />
                <TextField
                    sx={{ width: '300px' }}
                    margin='normal'
                    size='small'
                    label='Password'
                    value={data.password}
                    type={pswrdVisibility ? 'text' : 'password'}
                    onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                />
                <Box style={{ display: 'flex' }}>
                    <Checkbox
                        size='small'
                        checked={pswrdVisibility}
                        onChange={() => setPswrdVisibility(!pswrdVisibility)}
                    />
                    <Typography variant='subtitle2' sx={{ marginTop: '10px' }}>
                        Show Password
                    </Typography>
                </Box>
                <Button variant='contained' color='error' sx={{ width: '300px' }} onClick={handleSubmit}>
                    SIGN IN
                </Button>
                <Button
                    variant='text'
                    color='error'
                    className='sign-text-reset'
                    sx={{ width: '300px' }}
                    onClick={handleReset}
                >
                    RESET PASSWORD
                </Button>
                {error ? <AlertAuth /> : null}
            </Box>
        </Container>
    )
}


export default LoginPage