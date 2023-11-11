import React from "react";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRegisterSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setOpen(false);
      alert(`Register successfully..`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(`login successfully...`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row container">
      <div
        style={{ borderRadius: "0% 0% 100% 0%", height: "97vh" }}
        className="col bg-primary d-flex justify-content-center align-items-center px-0 "
      >
        <div className="me-5 mb-5 text-white">
          <h1 className="text-center mb-3">Register</h1>
          <h4>Don't Have an Account? Register one!</h4>
          <div className="text-center mt-4">
            <Button variant="contained" onClick={handleClickOpen}>
              Register an Account
            </Button>
          </div>
          {/* dialog */}
          <BootstrapDialog
            style={{ textAlign: "center" }}
            fullWidth
            maxWidth={"sm"}
            onClose={handleRegisterSubmit}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              User Registration
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleRegisterSubmit}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Stack spacing={2} margin={2}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  value={password}
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <button
                className="btn btn-primary"
                onClick={handleRegisterSubmit}
              >
                Submit
              </button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </div>

      <div className="col d-flex justify-content-center align-items-center">
        {/* input field and button */}
        <div className="w-100 d-flex justify-content-center align-items-center flex-column ">
          <h1 className="text-center text-primary mb-3">Login</h1>
          <TextField
            className="w-75"
            id="outlined-basic"
            label="Enter a Username"
            variant="outlined"
          />
          <FormControl className="w-75 mt-3" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            onClick={handleSignIn}
            className="w-50 mt-3 "
            variant="outlined"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
