// import { useForm } from "../../hooks/useAuth";
// import { registerUser } from "../../services/authService";
// import { keyWord } from "../../utils/keyword";
// import { Container, TextField, Button, Typography, Box, Grid, Link, Alert } from "@mui/material";

// const RegisterForm = () => {
//   const { values, handleChange, handleSubmit, passwordMismatch } = useForm(
//     {
//       storeName: "",
//       userName: "",
//       email: "",
//       phone: "",
//       address: "",
//       password: "",
//       confirm_password: "",
//     },
//     registerUser,
//     keyWord?.actionType?.register
//   );

//   return (
//     <Container
//       sx={{
//         width: "100vw", // Full width
//         height: "100%", // Full height
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: "100%",
//           maxWidth: "50%", // Restrict form width
//           p: 4,
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h4" align="center" mb={2}>
//           Register
//         </Typography>
//         <Typography variant="body2" align="center" mb={2}>
//           <Link href="/login" underline="hover">
//             Already have an account? Login here
//           </Link>
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Store Name" name="storeName" value={values?.storeName} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="User Name" name="userName" value={values?.userName} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth type="email" label="E-mail" name="email" value={values?.email} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Phone" name="phone" value={values?.phone} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Address" name="address" value={values?.address} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth type="password" label="Password" name="password" value={values?.password} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth type="password" label="Confirm Password" name="confirm_password" value={values?.confirm_password} onChange={handleChange} required />
//             {passwordMismatch && (
//               <Alert severity="error" sx={{ mt: 1 }}>
//                 Confirm password does not match
//               </Alert>
//             )}
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" fullWidth variant="contained">
//               Sign Up
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default RegisterForm;
import { useState } from 'react';
import { useForm } from "../../hooks/useAuth";
import { registerUser } from "../../services/authService";
import { keyWord } from "../../utils/keyword";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Fade,
  Zoom
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Store,
  Person,
  Email,
  Phone,
  Home,
  Lock
} from "@mui/icons-material";
 
const RegisterForm = () => {
  const { values, handleChange, handleSubmit, passwordMismatch } = useForm(
    {
      storeName: "",
      userName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirm_password: "",
    },
    registerUser,
    keyWord?.actionType?.register
  );
 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hoveredField, setHoveredField] = useState(null);
 
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
 
  const getIcon = (fieldName) => {
    switch (fieldName) {
      case 'storeName': return <Store />;
      case 'userName': return <Person />;
      case 'email': return <Email />;
      case 'phone': return <Phone />;
      case 'address': return <Home />;
      case 'password':
      case 'confirm_password':
        return <Lock />;
      default: return null;
    }
  };
 
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}
    >
      <Zoom in={true}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '80%', md: '60%', lg: '40%' },
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 6,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              boxShadow: 8
            }
          }}
        >
          <Typography
            variant="h4"
            align="center"
            mb={2}
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3f51b5, #2196f3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Create Your Account
          </Typography>
 
          <Typography variant="body2" align="center" mb={3}>
            <Link
              href="/login"
              underline="hover"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              Already have an account? Login here
            </Link>
          </Typography>
 
          <Grid container spacing={3}>
            {Object.keys(values).map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  fullWidth
                  label={
                    field === 'confirm_password'
                      ? 'Confirm Password'
                      : field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                  }
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                  required
                  type={
                    (field === 'password' || field === 'confirm_password')
                      ? (field === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password'))
                      : field === 'email' ? 'email' : 'text'
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getIcon(field)}
                      </InputAdornment>
                    ),
                    endAdornment: (field === 'password' || field === 'confirm_password') && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={field === 'password' ? handleClickShowPassword : handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {field === 'password' ? (showPassword ? <VisibilityOff /> : <Visibility />) : (showConfirmPassword ? <VisibilityOff /> : <Visibility />)}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onMouseEnter={() => setHoveredField(field)}
                  onMouseLeave={() => setHoveredField(null)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: hoveredField === field ? 'primary.main' : '',
                        borderWidth: hoveredField === field ? 2 : 1
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main'
                      }
                    },
                    transition: 'all 0.3s ease'
                  }}
                />
              </Grid>
            ))}
 
            {passwordMismatch && (
              <Grid item xs={12}>
                <Fade in={passwordMismatch}>
                  <Alert severity="error" sx={{ mt: -1, mb: -2 }}>
                    Passwords do not match!
                  </Alert>
                </Fade>
              </Grid>
            )}
 
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Zoom>
    </Box>
  );
};
 
export default RegisterForm;
 
 