import { AuthState } from "@/models/states/authState";
import { RegisterState } from "@/models/states/registerState";
import store, { RootState } from "@/redux/store";
import { register } from "@/redux/userSlice";
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RegistrationFormErrors {
  email: string;
  password: string;
  username: string;
}

const RegisterForm = () => {
  const user: RegisterState = useSelector((state: RootState) => state.user);
  const auth: AuthState = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<RegistrationFormErrors>({
    email: "",
    password: "",
    username: "",
  });

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if( token ){
      router.push("/");
    }
  })

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: RegistrationFormErrors = {
      email: "",
      password: "",
      username: "",
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      newErrors.email =
        'Value is not a valid email address. It should have an "@" symbol and a period.';
      isValid = false;
    }

    if (credentials.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long";
      isValid = false;
    }

    if (credentials.password !== credentials.confirm_password) {
      newErrors.password = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      store.dispatch(register(credentials)).then(()=>router.push("/login")).catch((err)=>console.log(err));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div>
      <Box height="100%" justifyContent="center" display="flex">
        <Stack alignItems="center">
          <Typography variant="h2" margin={2}>
            Register
          </Typography>
          <form onSubmit={handleRegistration}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                size="small"
                error={Boolean(errors.username)}
                sx={{ width: "300px" }}
              />
              {errors.username && (
                   <FormHelperText sx={{ mt: 0, mb: 1 , maxWidth:"300px"}} error>
                  {errors.username}
                </FormHelperText>
              )}
              <TextField
                label="Email"
                name="email"
                value={credentials.email}
                type="email"
                size="small"
                error={Boolean(errors.email)}
                onChange={handleChange}
                sx={{ width: "300px" }}
              />
              {errors.email && (
                <FormHelperText sx={{ mt: 0, mb: 1 , maxWidth:"300px"}} error>
                  {errors.email}
                </FormHelperText>
              )}
              <TextField
                label="Password"
                name="password"
                value={credentials.password}
                type="password"
                size="small"
                error={Boolean(errors.password)}
                onChange={handleChange}
                sx={{ width: "300px" }}
              />
              <TextField
                label="Confirm Password"
                name="confirm_password"
                value={credentials.confirm_password}
                type="password"
                size="small"
                error={Boolean(errors.password)}
                onChange={handleChange}
                sx={{ width: "300px" }}
              />
              {errors.password && (
                      <FormHelperText sx={{ mt: 0, mb: 1 , maxWidth:"300px"}} error>
                  {errors.password}
                </FormHelperText>
              )}
              {user.error && (
                <Typography color="error" sx={{ maxWidth: "300px" }}>
                  {typeof user.error.detail === "string"
                    ? user.error.detail
                    : user.error.detail[0].msg}
                </Typography>
              )}{" "}
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </div>
  );
};

export default RegisterForm;
