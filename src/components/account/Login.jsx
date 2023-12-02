
import React,{ useState } from 'react'

// for api 
import { API } from '../../service/api'

// for formik and Yup
import {useFormik} from 'formik'
import {signupSchema} from '../../schemas/schemas'

// css
import {Box,Typography,TextField,Button,Snackbar,SnackbarContent} from '@mui/material'

import './Login.css'
import blog from '../../images/Blog.png'

const signupValue = {
    name : '',
    email : '',
    username : '',
    password : ''
}

// for signin and signup 
const LoginWindow = () => {

    // for login and signup toggel frame
    const [account, toggelAccount] = useState('login')

    // for error message display
    const [msg, setMsg] = useState('')


    // for signup value store
    // const [svalue, setSvalue] = useState(signupValue)

    const openSigup = () => {
        account === 'signup' ? toggelAccount('login') : toggelAccount('signup')
    }

    // const signupHandle = (e) => {
        // setSvalue({...svalue,[e.target.name]:e.target.value})
        // console.log(e.target.name,e.target.value)
    // }
    // console.log(svalue)

    // using formik
    const userSingup = useFormik({
        initialValues : signupValue,
        validationSchema : signupSchema,
        onSubmit : async (values) => {
            var response = await API.userSignup(values);
            if (response.isSuccess){
                setMsg(response.message)
                console.log(response.message)
                toggelAccount('login')
                aLert()
            }else {
                setMsg('Something went wrong');
            }
        }   
    })

    // for snaker
    const alertValue = {
        open: false,
        vertical: 'top',
        horizontal: 'right',
    }
    const [alert, setAlert] = useState(alertValue);

    const aLert = (newState) => {
        setAlert({ open: true, vertical: 'top', horizontal: 'right', ...newState });
    };
    const handleClose = () => {
        setAlert({...alert, open: false})
    };
   
    const { vertical, horizontal, open } = alert;

  


    // console.log(userSingup);
    // console.log(userSingup.values)
    
    return(
        <Box className="box">
            <div className="header">
                <img src={blog} alt='logo' className='logo' />
                <Typography variant='h3'>logPost</Typography>
            </div>
            { account === 'login' ? 
                    
                        <div className="head">
                            <form className="formstyle">
                                <TextField label='UserName' name='email' variant='standard' autoComplete = "off" />
                                <TextField label='Password' name='password' variant='standard' type='password' />
                                <Button variant='contained' className='login-button' type='submit'>Login</Button>
                            </form>
                                { msg && <Typography>{msg}</Typography>}
                                <Typography id='or'>OR</Typography>
                                <Button className='signup-button' onClick={() => openSigup()}>Create an Account</Button>
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    autoHideDuration={2000}
                                    open={open}
                                    onClose={handleClose}
                                    message="SignUp Successfull"
                                    key={vertical + horizontal}
                                    
                                >
                                
                                    <SnackbarContent style={{
                                        backgroundColor: 'teal',
                                    }}
                                        message={<span>SignUp Successfull</span>}  
                                    />
                                    
                                </Snackbar>
                        </div>
                : 
                        <div className="head">
                            <form className="formstyle" onSubmit={userSingup.handleSubmit}>
                                <TextField
                                    label='Name' 
                                    name='name'
                                    variant='standard'
                                    autoComplete = "off"
                                    id='standerd-error-helper-text'
                                    onChange={userSingup.handleChange}
                                    onBlur={userSingup.handleBlur}
                                    error={(userSingup.errors.name && userSingup.touched.name)}
                                    helperText={ (userSingup.errors.name && userSingup.touched.name) ? userSingup.errors.name : null }
                                 />
                                <TextField 
                                    label='Email'
                                    name='email' 
                                    variant='standard'
                                    onChange={userSingup.handleChange}
                                    onBlur={userSingup.handleBlur}
                                    error = {(userSingup.errors.email && userSingup.touched.email)}
                                    helperText = {(userSingup.errors.email && userSingup.touched.email) ? userSingup.errors.email : null }
                                />
                                <TextField 
                                    label='Username' 
                                    name='username' 
                                    variant='standard'
                                    onChange={userSingup.handleChange}
                                    onBlur={userSingup.handleBlur}
                                    error = {(userSingup.errors.username && userSingup.touched.username)}
                                    helperText = {(userSingup.errors.username && userSingup.touched.username) ? userSingup.errors.username : null }
                                />
                                <TextField 
                                    label='Password' 
                                    name='password' 
                                    variant='standard' 
                                    type='password'
                                    onChange={userSingup.handleChange}
                                    onBlur={userSingup.handleBlur}
                                    error = {(userSingup.errors.password && userSingup.touched.password)}
                                    helperText = {(userSingup.errors.password && userSingup.touched.password) ? userSingup.errors.password : null }
                                />
                                <Typography>{msg}</Typography>
                                <Button className='signup-button' type='submit'>SignUp</Button>
                            </form>
                                <Typography id='or'>OR</Typography>
                                <Button variant='contained' className='login-button' onClick={() => openSigup()}>Already have an account</Button>
                        </div>
            }
        </Box>

    )
}



const Login = () => {
    return(
        <React.Fragment>
            <LoginWindow />
        </React.Fragment>
    )
}

export default Login;