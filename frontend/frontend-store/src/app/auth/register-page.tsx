import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ======= Material UI ======= //
import { Typography, TextField, Button, Checkbox, Container, Box } from '@mui/material'
import { ElemStyle, HeaderStyle, PageStyle, ContentStyle } from './mui'

// ======= Store ======= //
import { useAppDispatch } from 'store'
import { signupUser } from '../auth/store/auth.actions';

// ======= Types ======= //
import { RegisterDto } from './types/register-dto.type'
import AlertAuth from '../../components/alert-auth'

export const RegisterPage = () => {
  const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)
  const [data, setData] = useState<RegisterDto>({ email: '', password: '' })
  const [error, setError] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    const registerData: RegisterDto = {
      email: data.email,
      password: data.password
    }

    dispatch(signupUser({ data: registerData })).then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        setData({ email: '', password: '' })
        navigate('/store', { replace: true });
      }
      if (meta.requestStatus === "rejected") {
        setError(true)
      }
    }
    )
  }

  const handleReset = () => { setError(false); setData({ email: '', password: '' }) }



  return (
    <Container className='reg-page' sx={PageStyle}>
      <Box className='reg-header' sx={HeaderStyle}>
        <Box className='reg-header-elem' sx={ElemStyle}>
          <Link to='/auth/login'>
            <Typography variant='h6'>LOGIN</Typography>
          </Link>
        </Box>
        <Box className='reg-header-elem' sx={ElemStyle}>
          <Typography variant='h6' sx={{ borderBottom: '2px #eeeef0 solid' }}>
            SIGNUP
          </Typography>
        </Box>
      </Box>
      <Box className='sign-content' sx={ContentStyle}>
        <Typography variant='h3'>{"You're Welcome"}</Typography>
        <Typography variant='h6'>Register to continue!</Typography>
        <TextField
          sx={{ width: '300px' }}
          margin={'dense'}
          size='small'
          label='Email'
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
        />
        <TextField
          sx={{ width: '300px' }}
          margin='normal'
          size='small'
          label='Password'
          type={pswrdVisibility ? 'text' : 'password'}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          value={data.password}
        />
        <Box sx={{ display: 'flex' }}>
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
          SIGN UP
        </Button>
        <Button
          variant='text'
          color='error'
          className='sign-text-reset'
          type='reset'
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

export default RegisterPage