import Link from 'next/link'

const AuthNavigationbar = () => {
    return (
        <>
        <div className="auth-navbar">
        <h1>Sticky Note</h1>
        <div className="menu">
        <h5><Link href="/sign-up"> Sign Up </Link></h5>
        <h5><Link href="/sign-in"> Log In </Link></h5>
        </div>
        </div>
        </>
    )
}
export default AuthNavigationbar