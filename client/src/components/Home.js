import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect';

export default function Home() {

  const [userData, setUserData] = useState('');
  const [show, setShow] = useState(false);

  // console.log(userData);

  const callHomePage = async ()=>{
    const res = await fetch('/getData', {
      method: 'GET',
      headers:{
        "Content-Type": 'application/json'
      }
    });

    const data = await res.json();
    setUserData(data);
    setShow(true);
  }

  useEffect(()=>{
    callHomePage();
  }, []);

  return (
    <>
        <div style={{height:'100vh'}}>
        <div className='home-text'>
        <div className='home-text-title'>
        <Typewriter
            options={{
              strings: ['Hello', userData.name],
              autoStart: true,
              loop: true,
            }}
          />
          </div>
          <div className='home-text-body'>
          {
            show ? <Typewriter
              options={{
              strings: userData.work,
              autoStart: true,
              loop: false,
            }}
          /> :
          ''
          }
          
          </div>
          </div>
          </div>
    </>
  )
}
