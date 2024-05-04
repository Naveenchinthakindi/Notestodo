import React from 'react'
import { database } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { signOut } from 'firebase/auth'

const SignOut = () => {

    const navigate = useNavigate();
    const handleSignout = ()=>{
        signOut(database).then((data)=>{
            console.log("success logout ",data );
            navigate("/signin")
        })
    }

  return (
    <div style={{display:'inline'}}>
      <Button className='toggle-btn' onClick={handleSignout}>Signout</Button>
    </div>
  )
}

export default SignOut
