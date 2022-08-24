import { useState } from 'react'

import Footer from './Footer'
import Link from 'next/link'

const AuthNavigationbar = () => {
    return (
        <>
        <div className="auth-navbar">
        <h1>Sticky Note</h1>
        <div className="menu">
{/*         <Link href="/sign-up"> <h5>Sign Up</h5> </Link> */}
         <Link href="/sign-in"> <h5>Log In</h5> </Link> 
        </div>
        </div>
        </>
    )
}
const SignIn = () => {
  const [userInputs, setUserInputs] = useState({})

  const saveUserInputs = (e: any) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value })
    console.log(userInputs)
  }

  return (
    <>
    <section className='main-container'>
      <AuthNavigationbar />
      <div className="auth-container">
        <form className="auth-form">
          <h3>Sign In</h3>
          <input type='text' name="usernameOrEmail" placeholder="Username or Email" onChange={(e) => saveUserInputs(e)} />
          <input type='password' name="password" placeholder="Password" onChange={(e) => saveUserInputs(e)} />
          <button>Login</button>
        </form>
      </div>
      <Footer />
      </section>
    </>
  )
}
export default SignIn