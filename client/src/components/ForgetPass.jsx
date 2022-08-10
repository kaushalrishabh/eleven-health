import React, { useState, Fragment } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import PicComponent from './PicComponent';

const ForgetPass = () => {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });
    
    //Use state declarations
    const [flag, setFlag] = useState(false);
    const [message, setMessage] = useState('')
    const [Redirect, setRedirect] = useState(false);
    
    const {email, password, password2} = formData;
    
    //Password Validation
    const isContainUpperCase = /^(?=.*[A-Z]).*$/;
    const isContainSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|:;"'<>,.?/_₹]).*$/;
    const isContainNumber  = /[0-9]/; 
    
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if(password!==password2)
            return (setFlag(true),
                setMessage('Incorrect password')
            );
        else if(password.length <= 10){
            return (
                setFlag(true),
                setMessage('Password must be longer than 10 characters')
            );
        } 
        else if(!isContainUpperCase.test(password)){
            return (
                setFlag(true),
                setMessage('Password must contain atleast one Upper case character')
            );
        }
        else if(!isContainSymbol.test(password)){
            return (
                setFlag(true),
                setMessage('Password must contain atleast one special charcter')
            );
        }
        else if(!isContainNumber.test(password)){
            return (
                setFlag(true),
                setMessage('Password must contain atlease on Uppercase letter')
            );
        }
        else
        {
            const newUser = {
                email,
                password
            };
            try
            {
                const config = {
                    header:{
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify(newUser)
                const res = await api.put('/user', body, config);
                
                if(res.data.errors){
                    return (
                        setFlag(true),
                        setMessage('User does not exist')
                    );
                }
                else
                {
                    return (
                        setFlag(false),
                        setMessage(res.data),
                        setRedirect(true)
                    );
                }
            }
            catch(err){
                console.log(err.response.data);
            }
        }       
    }
    return (
    <Fragment>
        <div className='row'>
            <div className='col-8'>
                <PicComponent />
            </div>
            <div className='App-header col-4'>
                <h3 className='green'> Forgot Password?</h3>
                <form className='form mt-4 p-2' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <label> Email</label>
                    <input
                        className='form-control' 
                        type="text"
                        value={email}
                        name="email"
                        placeholder='eg. JohnDoe@gmail.com'
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <span className='f6'> Password should contain atleast one Uppercase character and one Special character</span>
                <div className='form-group'>
                    <label> New Password</label>
                    <input 
                        className='form-control'
                        type="password"
                        value={password}
                        name="password"
                        placeholder='Password'
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label> Re-type Password</label>
                    <input 
                        className='form-control'
                        type="password"
                        value={password2}
                        name="password2"
                        placeholder='Re-type Password'
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <button className='btn btn-success mt-2' type='submit' name='ForgetPass'> Submit </button>
                    </div>
                    <div className='col-6'>
                        <Link to="/"><button className='btn btn-success mt-2' type='GoBack' name='Login'> Go back to Login </button> </Link>
                    </div>
                </div>

            </form>
            {
                flag ? <div className='bg-red f6' >{message}</div> 
                : ''
            }
            {
                Redirect ? 
                        <div className='green f6'> 
                            <span>Password changed successfully! <br/>
                                <span> Please login using new credentials </span> </span>   
                                <button className='btn btn-success white'><Link to ="/" className='white'> Login </Link></button>
                        </div> 
                : ''
            }
            </div>
        </div>
    </Fragment>
  )
}

export default ForgetPass;