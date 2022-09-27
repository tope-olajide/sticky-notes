
import { LOGOUT_MUTATION } from "../mutations/users";
import { useMutation } from "@apollo/client";
import router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const MainNavigationBar = () => {
const [signout] = useMutation(LOGOUT_MUTATION);

const logout = async () => {
    localStorage.setItem("isLoggedIn", 'false');
    try {
        await signout();
        router.push('/sign-in')
    }
    catch {
        toast.error('Unable to logout.', {
            position: "bottom-center",
            autoClose: false
          });
    }
}
    return (
        <>
        <ToastContainer />
            <div className="auth-navbar">
                <h1>Sticky Note</h1>
                <div className="menu">
                <button onClick={logout} className="logout-button">Logout</button>
                </div>
            </div>
        </>
    )
}
export default MainNavigationBar