import React, { useEffect, useState } from 'react'

export default function Contact() {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    message:''
  });

  const callAboutPage = async ()=>{
    try {
      const res = await fetch('/getData', {
        method:"GET",
        headers:{
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      // console.log(data);
      setUserData({...userData, name:data.name, email:data.email, phone: data.phone});

      if(!res.status === 200){
        throw new Error(res.error);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    callAboutPage();
  }, []);

  
  const handleInputs = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData,  [name]:value});
  }

  //send data to backend

  const contactForm = async (e)=>{
    e.preventDefault();

    const {name, email, phone, message} = userData;

    const res = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, phone, message})
    })
    const data = await res.json();

    if(!data){
      console.log("message not sent");
    }
    else{
      alert("Message Sent");
      setUserData({...userData, message: ''});
    }
    
  }



  return (
    <>
      
        <div className='container-fluid my-100'>
          <div className='row '>
            {/* <div className=' d-flex justify-content-between col-lg-10 offset-1'>
              <div className='contact-info-item d-flex justify-content-start align-items-center'>
                <img src='' alt='img' />
                <div>
                  <div className='contact-info-title'>
                    Phone
                  </div>
                  <div className='contact-info-text'>
                    +845613133
                  </div>
                </div>
              </div>
              <div className='contact-info-item d-flex justify-content-start align-items-center'>
                <img src='' alt='img' />
                <div>
                  <div className='contact-info-title'>
                    Phone
                  </div>
                  <div className='contact-info-text'>
                    +845613133
                  </div>
                </div>
              </div>
              <div className='contact-info-item d-flex justify-content-start align-items-center'>
                <img src='' alt='img' />
                <div>
                  <div className='contact-info-title'>
                    Phone
                  </div>
                  <div className='contact-info-text'>
                    +845613133
                  </div>
                </div>
              </div>

            </div>
          </div> */}
          <div className='form-cont contact-cont'>
          <h2 className='form-title'>Contact Us</h2>
          <form className='mt-9 contact-form' method='POST'>
            <div className="mb-3">
            <label
										htmlFor='name'
										className='form-label'>
										<i className="zmdi zmdi-account-circle zmdi-hc-1x me-2"></i>
										Name
									</label>
              <input type="name" onChange={handleInputs} name='name' className="form-control" id="name" aria-describedby="emailHelp" value={userData.name}  />
            </div>
            <div className="mb-3">
            <label
										htmlFor='email'
										className='form-label'>
										<i className='zmdi zmdi-account zmdi-hc-1x me-2' />
										Email address
									</label>
              <input type="email" onChange={handleInputs} name='email' className="form-control" id="email" aria-describedby="emailHelp" value={userData.email} />
            </div>
            <div className="mb-3">
            <label htmlFor='phone' className='form-label'>
								<i className='zmdi zmdi-phone zmdi-hc-1x me-2' />
                Phone
            </label>
              <input type="phone" onChange={handleInputs} name='phone' className="form-control" id="phone" aria-describedby="emailHelp" value={userData.phone} />
            </div>
            <div className="mb-3">
            <label htmlFor='phone' className='form-label'>
								<i className='zmdi zmdi-comment zmdi-hc-1x me-2' />
                Message
            </label>
              <textarea name='message' onChange={handleInputs} className="form-control" id="exampleFormControlTextarea1" rows="3" value={userData.message} ></textarea>
            </div>
            <div>
            <div className='button'>
                <button
									type='submit'
									name='signup'
									id='signup'
									onClick={contactForm}
									className='button-89'>
									Submit
								</button>
                </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  )
}
