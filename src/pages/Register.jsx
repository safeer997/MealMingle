import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [number, setNumber] = useState('');
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    if (!number) {
      toast.error('Number can not be empty.');
      return;
    }
    setRequesting(true);
    try {
      // console.log('send reqquest: ', number);
      const response = await axios.post(
        'https://staging.fastor.ai/v1/pwa/user/register',
        {
          phone: number,
          dial_code: '+91',
        }
      );
      console.log('register response:', response);
      if (response.data.status === 'Success') {
        localStorage.setItem('fastorPhone', number);
        toast.success('otp sent!!');
        navigate('/otp');
      } else if (response.data.status === 'Failed') {
        // console.log('Backend returned failure:', response.data.error_message);
        toast.error(response.data.error_message || 'Something went wrong');
      } else {
        toast.error('could not send otp');
      }
    } catch (error) {
      console.log('register error:', error);
      const msg =
        error.response?.data?.error_message || 'api error or network problem';
      toast.error(msg);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: '#f8f8f7',
      }}
    >
      <ToastContainer position='top-center' />
      <Box
        sx={{
          maxWidth: 400,
          bgcolor: 'white',
          borderRadius: '0px',
          p: 3,
          margin: '0 auto',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 22,
            mb: 1,
            color: '#1a1a1a',
          }}
        >
          Enter Your Mobile Number
        </Typography>
        <Typography sx={{ color: '#999', fontSize: 13, mb: 3 }}>
          We will send you the 6 digit verification code .
        </Typography>
        <TextField
          placeholder='Enter your mobile number'
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
            console.log('Mobile number input changed:', e.target.value);
          }}
          fullWidth
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': { background: '#f7f7f7' },
          }}
        />
        <Button
          onClick={handleRegisterClick}
          disabled={requesting}
          variant='contained'
          sx={{
            bgcolor: '#ff6b6b',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '6px',
            fontSize: '15px',
            '&:hover': { bgcolor: '#ff6b6b' },
          }}
          fullWidth
        >
          {requesting ? 'Sending...' : 'Send Code'}
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
