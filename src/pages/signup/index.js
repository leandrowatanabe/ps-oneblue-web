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

import * as axios from 'axios';

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
    name: yup.string().matches(/^[aA-zZ\s]+$/, 'Nome não pode conter caracteres especiais').required('Preenchimento obrigatório'),
    password: yup.string().matches(
        /^[0-9A-Za-z]*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?][0-9a-zA-Z]*$/,
       'Precisa conter pelo menos um caracter',
    ).min('8', 'Senha precisa ter pelo menos 8 caracteres').required('Preenchimento obrigatório'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas não coincidem').required('Confirmação necessária'),
})

function Message(props){
    return(
        <Alert severity={props.severity}>
            {props.message}
        </Alert>
    )
}

export default function SignUp() {
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
        if(!(errors.name || errors.password || errors.confirmPassword )){
            axios({
                method:'POST',
                url:`${HOST}/user/cadaster`,
                data: {
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
        }
    };


    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ bgcolor: 'primary.contrast' , borderRadius: 4}}>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingY:'2vh',
            }}
            >

            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            </Avatar>

            <Typography component="h1" variant="h5">
                Cadastro
            </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
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
                                <Message message={'nome válido'} severity={'success'} />)
                        }
                    </Grid>
                        <Grid item xs={12}>
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
                                    <Message message={'Senha válida'} severity={'success'} />)
                            }
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar Senha"
                                type={showPassword?"text":"password"}
                                id="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}

                                InputProps={{endAdornment:
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityIcon />}
                                </IconButton>}}
                            />
                            {touched.confirmPassword && 
                                (errors.confirmPassword?
                                    <Message message={errors.confirmPassword} severity={'error'} />:
                                    <Message message={'Senha confirmada'} severity={'success'} />)
                            }
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 , color:"primary.contrast"}}
                    >
                    Registrar
                    </Button>

                    <Grid container justifyContent="center" sx={{color:"primary.main"}}>
                        <Grid item>
                            <Link href="/login" variant="body2">
                            Já possui uma conta? Faça Login
                            </Link>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Box>

            <Snackbar
                open={postResponse[0]!==''?true:false}
                autoHideDuration={6000}
                onClose={()=>setPostResponse(['',])}
            >

                {postResponse[0]?
                    <Alert severity="success" sx={{ width: '100%' }}>Cadastro realizado com sucesso</Alert>:
                    <Alert severity="error" sx={{ width: '100%' }}>Nome já registrado</Alert>
                }

            </Snackbar>

        </Container>
        </ThemeProvider>
    );
}