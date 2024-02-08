import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";

// @mui

import {
  Stack,
  IconButton,
  InputAdornment,
  Button,
  Grid,
  styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

// components
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextField = styled(TextValidator)(() => ({
  width: "90%",
  marginBottom: "16px",
}));

// ----------------------------

export default function RegistrationForm() {
  const navi = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [CshowPassword, setCShowPassword] = useState(false);

  const [data, setdata] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
    acceptTerms: true,
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== data.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [data.password]);

  const handleChange = (e) => {
    // e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://food-server.cyclic.app/api/register/add", data)
      .then((e) => {

        const existingData = JSON.parse(localStorage.getItem("RegisterData")) || [];
        const newData = [...existingData, data];
        localStorage.setItem('RegisterData', JSON.stringify(newData));

        console.log("data",data);
        navi("/login");
        toast("Sign up successfully...");
      })
      .catch(() => {
        toast("Something wrong...");
      });
    setdata((e.target.value = ""));
  };
  return (
    <div className="container mt-5 login register">
      <Stack spacing={3}>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={() => null}
          autoComplete="off"
        >
          <TextField
            type="text"
            name="title"
            id="standard-basic"
            value={data.title || ""}
            onChange={handleChange}
            errorMessages={["Title is required"]}
            label="title"
            validators={["required"]}
            style={{ width: "100%" }}
          />

          <TextField
            type="text"
            name="firstName"
            label="First Name"
            onChange={handleChange}
            value={data.firstName || ""}
            validators={["required"]}
            errorMessages={["FirstName is required"]}
            style={{ width: "100%" }}
          />
          <TextField
            type="text"
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            value={data.lastName || ""}
            validators={["required"]}
            errorMessages={["LastName is required"]}
            style={{ width: "100%" }}
          />

          <TextField
            type="email"
            name="email"
            label="Email"
            value={data.email || ""}
            onChange={handleChange}
            validators={["required", "isEmail"]}
            errorMessages={["Email is required", "email is not valid"]}
            style={{ width: "100%" }}
          />

          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <FaEye className="fs-4" />
                    ) : (
                      <FaEyeSlash className="fs-4" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ width: "100%" }}
            label="Password"
            value={data.password || ""}
            onChange={handleChange}
            errorMessages={["Password is required"]}
            validators={[
              "required",
              "minStringLength:6",
              "maxStringLength: 15",
            ]}
          />

          <TextField
            style={{ width: "100%" }}
            type={CshowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setCShowPassword(!CshowPassword)}
                    edge="end"
                  >
                    {CshowPassword ? (
                      <FaEye className="fs-4" />
                    ) : (
                      <FaEyeSlash className="fs-4" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name="confirmPassword"
            onChange={handleChange}
            label="Confirm Password"
            value={data.confirmPassword || ""}
            validators={["required", "isPasswordMatch"]}
            errorMessages={[
              "this field is required",
              "password didn't match",
            ]}
          />

          <Button fullWidth size="large" type="submit" variant="contained">
            Register
          </Button>
        </ValidatorForm>
      </Stack>
    </div>
  );
}
