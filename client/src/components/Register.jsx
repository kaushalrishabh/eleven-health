import React, {Fragment, useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import api from '../api';
import PicComponent from './PicComponent';

const Register = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const navigate = useNavigate();
  const {name, email, password, password2} = formData;

  const onChange = (e) =>  setFormData({ ...formData, [e.target.name] : e.target.value })

  const onSubmit = async (e) => {
    
    e.preventDefault();

    if(password !== password2)
    {
      return alert("Password do not match");
    }
    else
    {
      const newUser = {
        name,
        email,
        password
        };
      
      try
      {
          const config = {
           headers: {
                'Content-Type': 'application/json' 
            }  
          }
          const body = JSON.stringify(newUser);
          const res = await api.post('/user', body, config);
          
          localStorage.token = res.data.token;
          navigate("/Landing");
      }
      catch(err)
      {
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
        <div className='col-4'>
          <div className='container mt-5 App-header'>
          <h2> Register as a <span className='green'>Doctor </span> </h2>
            <form className='form mt-4' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <label> Name</label> 
                  <input 
                    className='form-control' 
                    type="text" 
                    name='name'
                    value = {name}
                    placeholder='eg. John Doe'
                    onChange={(e)=> onChange(e)} 
                    required
                  />
                </div>
                <div className='form-group'>
                  <label> Email</label>
                  <input 
                    className='form-control' 
                    type="email" 
                    name='email'
                    value = {email}
                    placeholder='eg:JohnDoe@gmail.com'
                    onChange={(e)=> onChange(e)}
                    required 
                  /> 
                </div>
                <div className='form-group'>
                  <label> Password </label>
                  <input 
                    className='form-control' 
                    type="password" 
                    name='password'
                    value = {password}
                    placeholder='Password'
                    onChange={(e)=> onChange(e)} 
                    required
                  />
                </div>
                <div className='form-group'>
                  <label> Re-type Password </label>
                  <input 
                    className='form-control' 
                    type="password" 
                    name='password2'
                    value = {password2}
                    placeholder='Repeat Password'
                    onChange={(e)=> onChange(e)} 
                    required
                  />
                </div> 
                <div className='form-group mt-2'>
                  <input className="btn form btn-success" value="Register" type='submit' name="Register" />
                </div>
                <span className='f6 green'> Have an account? <button className='btn btn-success'><Link to="/" className='white'>Login</Link> </button></span>
            </form>
          </div>        
        </div>
      </div>
      
      
      </Fragment>
  );
}

export default Register;