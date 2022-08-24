import { useState, ChangeEvent, FormEvent } from 'react'
import Footer from './Footer'
import AuthNavigationbar from './AuthNavigationBar';
const SignUp = () => {

  const [userInputs, setUserInputs] = useState({})

  const saveUserInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [event.target.name]: event.target.value })
    console.log(userInputs)
  }

  const handleFormSubmit = async (event: FormEvent) => {
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
            <input type='text' name="fullname" placeholder="fullname" onChange={(event) => saveUserInputs(event)} />
            <input type='text' name="username" placeholder="username" onChange={(event) => saveUserInputs(event)} />
            <input type='email' name="email" placeholder="email" onChange={(event) => saveUserInputs(event)} />
            <input type='password' name="password" placeholder="password" onChange={(event) => saveUserInputs(event)} />
            <button onClick={handleFormSubmit}>Create Account</button>
          </form>
        </div>
        <Footer />
      </section>
    </>

  )
}
export default SignUp
