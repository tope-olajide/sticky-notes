import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Footer from './Footer'
import AuthNavigationbar from './AuthNavigationBar';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from "react-toastify";
import { SIGNUP_MUTATION } from '../mutations/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
const SignUp = () => {
const [signup, { loading, data, error }] = useMutation(SIGNUP_MUTATION);
const router = useRouter();
  const [userInputs, setUserInputs] = useState({})
  useEffect(() => {
     if (data) {
      console.log(data);
       setTimeout(() => router.push('/'), 3000);
       localStorage.setItem("isLoggedIn", 'true');
      toast.success("Registration Successful!", {
        position: "bottom-center"
      });
    }
    if (error) {
      toast.error('' + error, {
        position: "bottom-center",
        autoClose: false
      });
      console.log(error)
    }
 },[data, error, router]);
  const saveUserInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [event.target.name]: event.target.value })
    console.log(userInputs)
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await signup({
      variables: userInputs
    });
  };

  return (
    <>
      <section className='main-container'>
        <AuthNavigationbar />
        <ToastContainer />
        <div className="auth-container">
          <form className="auth-form">
            <h3>Create Acount</h3>
            <input type='text' name="fullname" placeholder="fullname" onChange={(event) => saveUserInputs(event)} />
            <input type='text' name="username" placeholder="username" onChange={(event) => saveUserInputs(event)} />
            <input type='email' name="email" placeholder="email" onChange={(event) => saveUserInputs(event)} />
            <input type='password' name="password" placeholder="password" onChange={(event) => saveUserInputs(event)} />
            <button  disabled={loading}  onClick={(event) => handleFormSubmit(event)}>{loading?<FontAwesomeIcon  icon={faSpinner} spin size="1x"/>:"Create Account"}</button>
          </form>
        </div>
        <Footer />
      </section>
    </>

  )
}
export default SignUp
