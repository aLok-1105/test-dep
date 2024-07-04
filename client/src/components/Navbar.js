/** @format */

import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';



export default function Navbar() {
	const {state, dispatch} = useContext(UserContext);

	console.log(state, dispatch);

	const RenderNavbar =()=>{
		if(state){
			return (
				<>
					<li className='nav-item'>
						<NavLink
							className='nav-link '
							aria-current='page'
							to='/' >
							Home
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/about' >
							About
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/contact' >
							Contact
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/logout' >
							Logout
						</NavLink>
					</li>
							
				</>
			)
		}
		else{
			return (
				<>
					<li className='nav-item'>
								<NavLink
									className='nav-link '
									aria-current='page'
									to='/' >
									Home
                                    </NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/about' >
									About
                                    </NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/contact' >
									Contact
                                    </NavLink>
							</li>
                            <li className='nav-item'>
								<NavLink className='nav-link' to='/login' >
									Login
                                    </NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/register' >
									Register
                                    </NavLink>
							</li>
				</>
			)
		}
	}

	return (
		<>
			<nav className='navbar navbar-expand-lg bg-body-tertiary'>
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='#' />
						N
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div
						className='collapse navbar-collapse'
						id='navbarSupportedContent'>
						<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
							<RenderNavbar />
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
