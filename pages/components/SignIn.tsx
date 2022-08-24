import { useState } from 'react'
import AuthNavigationBar from './AuthNavigationBar'
import Footer from './Footer'

const SignIn = () => {
  const [userInputs, setUserInputs] = useState({})

  const saveUserInputs = (e: any) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value })
    console.log(userInputs)
  }

  return (
    <>
    <section className='main-container'>
      <AuthNavigationBar />
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