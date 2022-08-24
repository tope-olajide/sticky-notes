import { useState } from 'react'
import Footer from './Footer'
import AuthNavigationbar from './AuthNavigationBar';
const SignUp = () => {

  const [userInputs, setUserInputs] = useState({})

  const saveUserInputs = (e: any) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value })
    console.log(userInputs)
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    console.log(userInputs)
  };

  return (
    <>
      <section className='main-container'>
        <AuthNavigationbar />
        <div className="auth-container">
          <form className="auth-form">
            <h3>Create Acount</h3>
            <input type='text' name="fullname" placeholder="fullname" onChange={(e) => saveUserInputs(e)} />
            <input type='text' name="username" placeholder="username" onChange={(e) => saveUserInputs(e)} />
            <input type='email' name="email" placeholder="email" onChange={(e) => saveUserInputs(e)} />
            <input type='password' name="password" placeholder="password" onChange={(e) => saveUserInputs(e)} />
            <button onClick={handleFormSubmit}>Create Account</button>
          </form>
        </div>
        <Footer />
      </section>
    </>

  )
}
export default SignUp
