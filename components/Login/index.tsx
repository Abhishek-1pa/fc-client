import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Box, Stack, Typography, FormControl, TextField, Button, FormHelperText } from '@mui/material';
import { login } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store';
import { AuthState } from '@/models/states/authState';
import { RegisterState } from '@/models/states/registerState';
import { useRouter } from 'next/router';

interface FormErrors {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const auth:AuthState = useSelector((state:RootState)=>state.auth);
  const user: RegisterState = useSelector((state:RootState)=>state.user);
  const [credentials, setCredentials] = useState<{ email: string; password: string }>({ email: user.user?user.user.email:'', password: '' });
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input
  };

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if( token ){
      router.push("/");
    }
  })

  const validateForm = () => {
    const newErrors: FormErrors = { email: '', password: '' };
    if (credentials.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Proceed with login logic
        store.dispatch(login(credentials)).then(r=>console.log(r)).catch((r)=>console.log(r));
        // Dispatch any additional actions or handle success
      } catch (error) {
        // Handle login failure
      }
    }
  };

  return (
    <div>
      <Box height={'100%'} justifyContent={'center'} display={'flex'}>
        <Stack alignItems={'center'}>
          <Typography variant="h2" margin={2}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <FormControl>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  name="email"
                  value={credentials.email}
                  type="email"
                  size="small"
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  sx={{ width: '300px' }} // Ensure consistent width
                />
                {errors.email && <FormHelperText sx={{ mt: 0, mb: 1 }} error>{errors.email}</FormHelperText>}
                <TextField
                  label="Password"
                  name="password"
                  value={credentials.password}
                  type="password"
                  size="small"
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  sx={{ width: '300px' }} // Ensure consistent width
                />
                {auth.error && (
                  <Typography color={"error"}>{auth.error?.detail}</Typography>
                )}
                <Button type="submit">Login</Button>
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </div>
  );
};

export default LoginForm;
