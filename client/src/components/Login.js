import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


export default function Login() {


  const {state, dispatch} = useContext(UserContext);

  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const loginUser = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('https://test-depe.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (res.status === 400 || !data) {
        window.alert('Invalid Credentials');
      } else {
        dispatch({ type: 'USER', payload: true });
        localStorage.setItem('token', data.token);
        window.alert('Login Successful');
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      window.alert('Failed to fetch. Please check your network or server configuration.');
    }
  };
	
  // const loginUser = async (event)=>{
  //   event.preventDefault();

  //   const res = await fetch('https://test-depe.vercel.app/login', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({email, password})
  //   })
    
  //   const data = await res.json();
  //   // console.log(data);
  //   // console.log(res);

  //   if(res.status === 400 || !data) {
  //     window.alert("Invalid Credentials");
  //   }
  //   else{
  //     dispatch({type: "USER", payload:true});
  //     window.alert("Login Successful");
  //     history("/");
  //   }
  // }


  return (
    <>

      <div className='container form-cont'>
        

        
          {/* <img className='login-img' src={LOGIN_IMG} alt=''/> */}
        
        <div className='container login-text-cont '>
        <h2 className='form-title'>Login</h2>
        <form method="POST">
        <div className="mb-3">
                <label htmlFor="email" className="form-label"><i className="zmdi zmdi-email zmdi-hc-1x me-2" />Email address</label>
                <input type="email" name='email' className="form-control" value={email} onChange={(event)=>setEmail(event.target.value)} id="email" aria-describedby="emailHelp" required='true'  />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label"><i className="zmdi zmdi-key zmdi-hc-1x me-2" />Password</label>
                <input type="password" name='password' className="form-control" value={password} onChange={(event)=>{setPassword(event.target.value)}} id="password" aria-describedby="emailHelp" required='true' />
              </div>
              <div className='button'>
                <button
									type='submit'
									id='login'
									onClick={loginUser}
									className='button-89'>
									Log In
								</button>
                </div>
              
</form>
        </div>
      </div>
    </>
  )
}
