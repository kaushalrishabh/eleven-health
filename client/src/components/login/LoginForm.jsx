import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';

const LoginForm = () => {
     const [formData, setFormData ] = useState({
        email: '',
        password: ''
     });

     const [flag, setFlag] = useState(false);
     const [message, setMessage] = useState('');

     localStorage.clear();
     let navigate = useNavigate(); 
     
     const {email, password} = formData

     const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

     const onSubmit = async (e) => {
        e.preventDefault();
        
        try 
        {
            const res = await api.post('/auth', formData);
            
            if(res.data.errors)
            {
                setFlag(true);
                setMessage(res.data.errors);
            }
            else
            {
                localStorage.token = res.data.token;
                setFlag(false);  
                navigate("/Landing");
            }
        }
        catch(err)
        {
            console.log(err.data);
        }
             
     }
    return (
    <Fragment>
    <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='App-header d-flex '>
            <h2> <b> Log in to <span className='green'> eleven</span> </b> </h2>
        </div>
        <div className='container p-2 App-header'>
            <div className='mt-2 form-group'>
                <input 
                    type="email" 
                    name='email'
                    value = {email}
                    placeholder='eg: John@gmail.com'
                    onChange={(e)=> onChange(e)} 
                    required
                />
            </div>
            <div className='mt-2 form-group'>
                <input 
                    type="password" 
                    name='password'
                    value={password}
                    minLength={6}
                    placeholder='Password'
                    onChange={(e)=> onChange(e)} 
                    required
                />
            </div>
        </div> 
        <div className='p-2'>
            <span> 
                <Link to='/ForgetPass' className='green'> Forget password </Link> 
            </span>        
        </div>
        <div className="row mt-2">
            <div className="container col-4">
                <input className="btn btn-success" type='submit' name="Login" />
            </div>
            <div className='d-flex align-items-stretch p-2 col-8'>
                <b>{ 
                    flag ? (<div className='bg-red'>{message}</div> )
                        : ''
                }</b>
            </div>
        </div>
        <div className='mt-2'>
            <span> <Link to='/Register' className='green'> User does not exist? Register here  </Link> </span>
        </div>
    </form>
    </Fragment>
  )
}

export default LoginForm;