import { useState, ChangeEvent, FormEvent } from 'react'
import AuthNavigationBar from './AuthNavigationBar'
import Footer from './Footer'

const SignIn = () => {
  const [userInputs, setUserInputs] = useState({})

  const saveUserInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [event.target.name]: event.target.value })
    console.log(userInputs);
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log(userInputs)
  };

  return (
    <>
    <section className='main-container'>
      <AuthNavigationBar />
      <div className="auth-container">
        <form className="auth-form">
          <h3>Sign In</h3>
          <input type='text' name="usernameOrEmail" placeholder="Username or Email" onChange={(event) => saveUserInputs(event)} />
          <input type='password' name="password" placeholder="Password" onChange={(e) => saveUserInputs(e)} />
          <button onClick={handleFormSubmit}>Login</button>
        </form>
      </div>
      <Footer />
      </section>
    </>
  )
}
export default SignIn