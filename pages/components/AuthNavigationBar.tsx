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
export default AuthNavigationbar