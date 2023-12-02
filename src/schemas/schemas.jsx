import * as Yup from 'yup';

// regex
const nameRegex  = /^([A-Za-z]+\s)*[A-Za-z]*$/;
const usernameRegex  = /^[A-Za-z_0-9]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const signupSchema = Yup.object({
    name : Yup.string().matches(nameRegex,`Enter your name in valid format`).min(2).max(25).required(`Required: Please enter your name`),
    email : Yup.string().matches(emailRegex,`Enter your valid email`).email().required(`Required: Please enter your email`),
    username : Yup.string().matches(usernameRegex,`allowed only 0-9,a-z,A-z,_`).min(3).max(12).required(`Required: Please enter your username`),
    password : Yup.string().min(8).max(15).required(`Required: Please enter your password`)
})