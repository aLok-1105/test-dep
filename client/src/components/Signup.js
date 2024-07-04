/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UPLOAD from '../images/upload.png'

export default function Signup() {
	const history = useNavigate();

	const [user, setUser] = useState({
		name: '',
		email: '',
		phone: '',
		work: '',
		password: '',
		cpassword: '',
    profileImg: ''
	});

	var name, value;

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload =()=>{
      setUser({...user, profileImg: reader.result});
    };
    reader.onerror = error =>{
      console.log(error);
    }

  }

	const handleInputs = (event) => {
		name = event.target.name;
		value = event.target.value;
		setUser({ ...user, [name]: value });
	};

	const postData = async (event) => {
		event.preventDefault();
		const { name, email, phone, work, password, cpassword, profileImg } = user;

		const res = await fetch('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				phone,
				work,
				password,
				cpassword,
        profileImg
			}),
		});

		const data = await res.json();

		if (res.status === 422 || !data) {
			window.alert('Invalid Registration');
		} else {
			window.alert('Registration Successful');

			history('/login');
		}
	};

	return (
		<>
			<div className='container form-cont reg-form'>
				{/* <img
					className='login-img'
					src='https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1685023246~exp=1685023846~hmac=6784aa5788cf6aee25971f82df15dac124862ea7027aff7743500d21a10eb66b'
					alt=''
				/> */}

				<div className='container login-text-cont '>
					<h2 className='form-title'>Create Account</h2>
					<form method='POST'>
          <div className='mb-3'>
									<label
										htmlFor='name'
										className='form-label'>
										<i className="zmdi zmdi-account-circle zmdi-hc-1x me-2"></i>
										Name
									</label>
									<input
										required
										type='name'
										className='form-control'
										name='name'
										id='name'
										value={user.name}
										onChange={handleInputs}
										aria-describedby='emailHelp'
									/>
								</div>
                <div className='mb-3'>
									<label
										htmlFor='email'
										className='form-label'>
										<i className='zmdi zmdi-email zmdi-hc-1x me-2' />
										Email address
									</label>
									<input
										required
										type='email'
										className='form-control'
										name='email'
										id='email'
										value={user.email}
										onChange={handleInputs}
										aria-describedby='emailHelp'
									/>
								</div>
                <div className='mb-3'>
									<label
										htmlFor='phone'
										className='form-label'>
										<i className='zmdi zmdi-phone zmdi-hc-1x me-2' />
										Phone
									</label>
									<input
										required
										type='phone'
										className='form-control'
										name='phone'
										value={user.phone}
										onChange={handleInputs}
										id='phone'
										aria-describedby='emailHelp'
									/>
								</div>
                <div className='mb-3'>
									<label
										htmlFor='work'
										className='form-label'>
										<i className='zmdi zmdi-run zmdi-hc-1x me-2' />
										Profession
									</label>
									<input
										required
										type='work'
										className='form-control'
										name='work'
										value={user.work}
										onChange={handleInputs}
										id='work'
										aria-describedby='emailHelp'
									/>
								</div>
                <div className='mb-3'>
									<label

										htmlFor='password'
										className='form-label'>
                    <i className="zmdi zmdi-key zmdi-hc-1x me-2"></i>
										Password
									</label>
									<input
										required
										type='password'
										className='form-control'
										name='password'
										value={user.password}
										onChange={handleInputs}
										id='password'
										aria-describedby='emailHelp'
									/>
								</div>
								<div className='mb-3'>
									<label
										htmlFor='cpassword'
										className='form-label'>
										<i className="zmdi zmdi-key zmdi-hc-1x me-2"></i>
										Confirm Password
									</label>
									<input
										required
										type='password'
										className='form-control'
										name='cpassword'
										value={user.cpassword}
										onChange={handleInputs}
										id='cpassword'
										aria-describedby='emailHelp'
									/>
								</div>
                <div className='mb-3'>

									<label

										htmlFor='image'
										className='form-label'>
										<i className="zmdi zmdi-image zmdi-hc-1x me-2"></i>
										Profile Photo
									</label>
									<input
										required
										type='file'
										className='form-control'
										name='profileImg'
                    onChange={convertToBase64}
										id='profileImg'
									/>
									<p style={{fontSize: '10px'}}><i>*Size of Image should be small</i></p>
								</div>
                <div className='button'>
                <button
									type='submit'
									name='signup'
									id='signup'
									onClick={postData}
									className='button-89'>
									Submit
								</button>
                </div>
                
						{/* <button
							type='submit'
							onClick={loginUser}
							id='login'
							className='button-89'>
							Log In
						</button> */}
					</form>
				</div>
			</div>
		</>
	);
}
