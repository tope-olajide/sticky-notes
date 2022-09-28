const ErrorPage = () => {
    return (
        <>
        <section className="error-page-container">
        <h3>An Error occured.</h3>
        <button onClick={()=>window.location.reload()}> Reload Page </button>
        </section>
        </>
    )
}

export default ErrorPage