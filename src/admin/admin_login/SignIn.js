import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { postData } from '../../backendservices/FetchNodeServices';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


export default function SignIn(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    var body = { emailid: emailId, password }
    var res = await postData('admin/chk_admin_login', body)
    console.log('result',res.data)
    if (res.status) {
      // alert('dashboard')
      dispatch({ type: 'ADMIN_LOGIN', payload: ['emailid', emailId] })
      localStorage.setItem('admin', JSON.stringify({ emailid: res.data }))
      navigate('/dashboard/displayallorders')
    }
    else { alert(res.message) }
  };


  return (
    <div style={{ height: '100vh', display: 'flex', width: '100vw', justifyContent: 'center', alignItem: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40%' }}>




        <Card variant="outlined">
          <div>
            <img src="/logo.png" style={{ width: '30%' }} />
          </div>

          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: '1.6vw' }}
          >
            Admin Login
          </Typography>
          <Box



            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="your@email.com/9301123085"

                autoFocus

                fullWidth
                variant="outlined"

              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField

                onChange={(e) => setPassword(e.target.value)}

                placeholder="••••••"
                type="password"

                autoComplete="current-password"
                autoFocus

                fullWidth
                variant="outlined"

              />
            </FormControl>

            <Button

              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>

          </Box>

        </Card>
      </div>

    </div>
  );
}