import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import NOT_FOUND from '../images/not-found.jpg';
import SUNSET from '../images/Sunset.jpg';

export default function About() {

  const history = useNavigate();
  const [userData, setUserData] = useState('');

  const callAboutPage = async ()=>{
    try {
      const res = await fetch('/about', {
        method:"GET",
        headers:{
          Accept:'application/json',
          "Content-Type": "application/json"
        },
        credentials:'include'
      });

      const data = await res.json();
      // console.log(data);
      // setUserData(data);


      if (res.status === 200) {
        // User is logged in, set user data
        setUserData(data);
      } else {
        // User is not logged in, redirect to login page
        throw new Error('User not authenticated');
      }

      // if(!res.status === 200 || !data){
      //   console.log("error");
      //   history('/login');
      //   throw new Error(res.error);
      // }
      

    } catch (error) {
      console.log("error1");
      history("/login");
    }
  }

  useEffect(()=>{
    callAboutPage();
  }, []);

  return (
    <>

<div className='profile-page' style={{color: 'white !important'}} >
<form method='GET'>
<div className="page-header header-filter" data-parallax="true" style={{backgroundImage:`url('https://images.unsplash.com/photo-1608408843596-b3119736057c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80')`, filter: 'brightness(0.7)'}}></div>
  <div className="main main-raised">
    <div className="profile-content">
      <div className="container">
        <div className="row">
          <div className="col-md-6 ml-auto mr-auto">
            <div className="profile">
              <div className="avatar">
                <img src= {userData.profileImg ? userData.profileImg : NOT_FOUND}  alt="Circle Image" className="img-raised rounded-circle img-fluid" />
              </div>
              <div className="name">
                <h3 className="title">{userData.name}</h3>
                <h6>{userData.work}</h6>
                <a href="#" className="btn btn-just-icon btn-link btn-insta"><i className="fa fa-instagram"></i></a>
                <a href="#" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-twitter"></i></a>
                <a href="#" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
            <div>
            <p className='text-justify mb-4' > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
        

        

      </div>
    </div>
  </div>
  </form>
  </div>




      {/* <div className='container'>
        <form method='GET'>
          <div className='row'>
            <div className='col-md-4'>
              <img src=' ' alt='img' />
            </div>
            <div className='col-md-6'>
              <div className='profile'>
                <h5>{userData.name}</h5>
                <p>rank</p>
                <ul className="nav nav-tabs">
                      <li className="active"><Link href="#home">Home</Link></li>
                      <li><Link href="#timeline">Menu 1</Link></li>
                    </ul>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='edit-profile'>
                <button type='button' >Edit profile</button>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <div>
                <p>Work Links</p>
                <Link href='#'>Insta</Link>
              </div>
            </div>
            <div className='col-md-8 pl-5'>
              <div className='tab-content' id='tab-content'>
                <div id='home'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>{userData.name}</label>
                    </div>
                    <div className='col-md-6'>
                      <label>{userData.email}</label>
                    </div>

                  </div>
                </div>
                <div id='#timeline'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>Timeline</label>
                    </div>
                    <div className='col-md-6'>
                      <label>Name</label>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div> */}
      </>
  )
}
