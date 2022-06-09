import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import * as axios from 'axios'

import { useFormik } from 'formik';
import * as yup from 'yup';

const HOST = process.env.REACT_APP_API_URL

const theme = createTheme({
    palette: {
        primary: {
            main: '#42a5f5',
            contrast: '#ffffff',
        }
    },
});

const validationSchema = yup.object({
    name: yup.string().required('Preenchimento obrigatório'),
    password: yup.string().required('Preenchimento obrigatório'),
})

function Message(props){
    return(
        <Alert severity={props.severity}>
            {props.message}
        </Alert>
    )
}

export default function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)

    const [postResponse, setPostResponse] = React.useState(['',''])

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
    } = useFormik({
        validationSchema,
        initialValues: {
            name: '',
            password: '',
            confirmPassword: ''
        }
    })

    const handleSubmit = (event) => { 
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        axios({
            method:'POST',
            url:`${HOST}/login`,
            data:{
                name: data.get('name'),
                password: data.get('password'),
            }
        }).then((response) => {
            console.log(response.data)
            setPostResponse([response.data.ok,response.data.why])
        }).catch((error) => {
            console.error(error.response.data);
            setPostResponse([error.response.data.ok,error.response.data.why])
        });
  
    };

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" sx={{bgcolor:"primary.contrast", borderRadius: 4}}>
        <CssBaseline />
        <Box
            sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingY:'2vh'
            }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        </Avatar>

        <Typography component="h1" variant="h5">
            Login
        </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="name"
                    autoComplete="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
                
                {touched.name && 
                    (errors.name?
                        <Message message={errors.name} severity={'error'} />:
                        <></>
                    )
                }
                
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type={showPassword?"text":"password"}
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    InputProps={{endAdornment:

                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityIcon />}
                        </IconButton>}}
                    />
                    {touched.password && 
                        (errors.password?
                            <Message message={errors.password} severity={'error'} />:
                            <></>
                        )
                    }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , color:"primary.contrast"}}
                    >
                    Login
                </Button>

                <Grid container justifyContent="center" sx={{color:"primary.main"}}>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            Não possui cadastro? Cadastre-se
                        </Link>
                    </Grid>
                </Grid>

            </Box>
        </Box>

        <Snackbar
            open={ postResponse[0]!=='' ? true : false }
            autoHideDuration={6000}
            onClose={()=>setPostResponse(['',])}
        >

        {postResponse[0]?
            <Alert severity="success" sx={{ width: '100%' }}>Login realizado com sucesso</Alert>:
            <Alert severity="error" sx={{ width: '100%' }}>Credenciais invalidas</Alert>
        }

        </Snackbar>
        
    </Container>
    </ThemeProvider>
  );
}