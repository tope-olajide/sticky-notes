import { useMutation } from '@apollo/client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import router from 'next/router'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { LOGIN_MUTATION } from '../mutations/users'
import AuthNavigationBar from './AuthNavigationBar'
import Footer from './Footer'

const SignIn = () => {
  const [userInputs, setUserInputs] = useState({})
  const [login, { loading, data, error }] = useMutation(LOGIN_MUTATION);
  useEffect(() => {
    if (error) {
      toast.error('' + error, {
        position: "bottom-center",
        autoClose: false
      });
    }
    if (data) {
      localStorage.setItem("isLoggedIn", 'true');
      setTimeout(() => router.push('/'), 3000);
      toast.success("Welcome back!", {
        position: "bottom-center"
      });
    }
  }, [data, error]);
  const saveUserInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [event.target.name]: event.target.value })
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await login({
      variables: userInputs
    });
  };

  return (
    <>
      <section className='main-container'>
        <AuthNavigationBar />
        <ToastContainer />
        <div className="auth-container">
          <form className="auth-form">
            <h3>Sign In</h3>
            <input type='text' name="usernameOrEmail" placeholder="Username or Email" onChange={(event) => saveUserInputs(event)} />
            <input type='password' name="password" placeholder="Password" onChange={(e) => saveUserInputs(e)} />
            <button disabled={loading} onClick={(event) => handleFormSubmit(event)}>  {loading ? <FontAwesomeIcon icon={faSpinner} spin size="1x" /> : "Login"}</button>
          </form>
        </div>
        <Footer />
      </section>
    </>
  )
}
export default SignIn