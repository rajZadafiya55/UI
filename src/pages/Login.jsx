import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/login.css';
// @mui

import { Stack, IconButton, InputAdornment, styled, Button } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

// components
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

// ----------------------------

export default function LoginForm() {
  useEffect(() => {

    // if (auth) {
    //   navigate("/");
    // }
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setdata] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://food-server.cyclic.app/api/register/login', data)
      .then((y) => {
        localStorage.setItem('AdminData', JSON.stringify(y.data.data || 0));
        toast('login successfully'); 
        navigate('/');
      })
      .catch((y) => {
        toast('Invalid Username/Password');
      });   
  };

  return (
    <div className='main'>
    <div className='container mt-5  login'>
      <Stack spacing={3}>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null} autocomplete="off">
          <TextField
            type="email"
            name="email"
            value={data.email || ''}
            errorMessages={['Email is required']}
            validators={['required']}
            label="Email address"
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Password"
            value={data.password || ''}
            onChange={handleChange}
            errorMessages={['Password is required']}
            validators={['required']}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <FaEye className='fs-4' /> : <FaEyeSlash className='fs-4' />}
                    </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth size="large" type="submit" variant="contained">
            Login
          </Button>
        </ValidatorForm>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <p className='mb-0'>Don't Have Account ?<Link to='/register'> SignUp</Link></p>
      </Stack>
    </div>
    </div>
  );
}