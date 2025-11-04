import { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const OtpVerify = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const phone = localStorage.getItem('fastorPhone');
  const defaultOtp = '123456';

  const handleChange = (val, index) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && i < 5) {
      const nextInput = document.getElementById(`otp-${i + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) prevInput.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);

    if (enteredOtp.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    if (enteredOtp !== defaultOtp) {
      toast.error('Invalid otp!,use default 123456 for testing!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://staging.fastor.ai/v1/pwa/user/login',
        {
          phone,
          otp: enteredOtp,
          dial_code: '+91',
        }
      );
      console.log('Login response:', response);

      if (response.data.status === 'Success') {
        localStorage.setItem('fastorToken', response.data.data.token);
        localStorage.setItem(
          'fastorUser',
          JSON.stringify({
            user_id: response.data.data.user_id,
            user_name: response.data.data.user_name,
            phone,
          })
        );
        toast.success('Login successful!');
        navigate('/home');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.log('Login error:', error);
      toast.error(error.response?.data?.message || 'API or Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        px: 2,
      }}
    >
      <ToastContainer position='top-center' />

      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'white',
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ p: 0 }}>
            <ArrowBackIcon sx={{ fontSize: 24, color: '#1a1a1a' }} />
          </IconButton>
        </Box>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 20,
            mb: 1,
            color: '#1a1a1a',
            textAlign: 'center',
          }}
        >
          OTP Verification
        </Typography>

        <Typography
          sx={{
            color: '#999',
            fontSize: 16,
            mb: 3,
            textAlign: 'left',
            lineHeight: 1.5,
          }}
        >
          Enter the verification code we just sent to your mobile number.
        </Typography>

        {/* OTP Inputs */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.2,
            mb: 3,
            width: '100%',
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type='text'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                width: 35,
                height: 35,
                fontSize: 16,
                fontWeight: 700,
                textAlign: 'center',
                border: '2px solid #e8e8e8',
                borderRadius: 8,
                backgroundColor: '#fafafa',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </Box>

        <Button
          variant='contained'
          fullWidth
          onClick={handleVerify}
          disabled={loading}
          sx={{
            bgcolor: '#ff6b6b',
            color: 'white',
            fontWeight: 600,
            fontSize: 15,
            py: 1.5,
            textTransform: 'none',
            borderRadius: '6px',
            mb: 2,
            '&:hover': { bgcolor: '#ff5252' },
            '&:disabled': { opacity: 0.7, cursor: 'not-allowed' },
          }}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>

        <Typography sx={{ fontSize: 13, color: '#999', textAlign: 'center' }}>
          Didn’t receive the code?{' '}
          <span
            style={{ color: '#ff6b6b', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => navigate('/register')}
          >
            Resend
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default OtpVerify;
