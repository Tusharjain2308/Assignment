import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, Box } from '@mui/material';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [mobile, setMobile] = React.useState<string>('');

  const [nameError, setNameError] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [mobileError, setMobileError] = React.useState<boolean>(false);

  const validateName = () => {
    setNameError(name.trim() === '');
  };

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(!isValid);
  };

  const validateMobile = () => {
    setMobileError(mobile.trim() === '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateName();
    validateEmail();
    validateMobile();

    if (name.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && mobile.trim() !== '') {
      const userDetails = {
        name,
        email,
        mobile,
      };

      console.log(userDetails);

      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      navigate('/Primary');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          error={nameError}
          helperText={nameError ? 'Name is required' : ''}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validateName}
        />
        <TextField
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
        <TextField
          error={mobileError}
          helperText={mobileError ? 'Mobile number is required' : ''}
          margin="normal"
          required
          fullWidth
          id="mobile"
          label="Mobile Number"
          name="mobile"
          autoComplete="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          onBlur={validateMobile}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={name.trim() === '' || email.trim() === '' || mobile.trim() === ''}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
