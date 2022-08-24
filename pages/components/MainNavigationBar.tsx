import Link from 'next/link'
const MainNavigationBar = () => {

    return (
        <>
            <div className="auth-navbar">
                <h1>Sticky Note</h1>
                <div className="menu">
                <Link href="/sign-in"><button className="logout-button">Logout</button></Link>
                </div>
            </div>
        </>
    )
}
export default MainNavigationBar