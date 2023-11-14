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

import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "../config/firebase";
import { addDoc, collection, getDocs, where } from "firebase/firestore";

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

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { username, email, password } = userData;

  // register
  const handleRegisterSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userid = userCredential.user.uid;

      const channelCollectionRefTask = collection(db, "users");
      await addDoc(channelCollectionRefTask, {
        username: username,
        email: email,
        uid: userid,
      });

      setOpen(false);
      alert(`Register successfully..`);
    } catch (error) {
      let errorMessage = "Error registering user:";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Email address is already in use.";
          break;
        default:
          errorMessage += ` ${error.message}`;
      }

      alert(errorMessage);
    }
  };

  // login
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userid = userCredential.user.uid;

      const channelCollectionRefTask = collection(db, "users");

      await getDocs(channelCollectionRefTask, where("uid", "==", userid));
      console.log(`login successfully...`);
      navigate("/document");
    } catch (err) {
      if (err.message === "Quota exceeded.") {
        alert("Server Busy..! Try Again");
      } else {
        alert("Invalid Username or Password!");
      }
    }
  };

  return (
    <div style={{ width: "100%" }} className="row">
      <div
        style={{
          borderRadius: "0% 0% 100% 0%",
          height: "100vh",
          fontFamily: "Agbalumo",
        }}
        className="col bg-primary fs-4 d-flex justify-content-center align-items-center px-0 "
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
              onClick={() => setOpen(false)}
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
                  label="Username"
                  value={userData.username}
                  variant="outlined"
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  value={userData.email}
                  variant="outlined"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  value={userData.password}
                  variant="outlined"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
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
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
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
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
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
