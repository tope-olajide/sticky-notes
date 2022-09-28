
import { LOGOUT_MUTATION } from "../mutations/users";
import { useMutation } from "@apollo/client";
import router from 'next/router';
import client from "../client";

const MainNavigationBar = () => {
    const [signout] = useMutation(LOGOUT_MUTATION);

    const logout = async () => {
        localStorage.setItem("isLoggedIn", 'false');
            client.clearStore();
            client.cache.gc();
            router.push('/sign-in');
            signout();
    }
    return (
        <>
           
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