

import NoteContainer from "../components/NoteContainer";
import SignIn from "../components/SignIn";

function HomePage() {
  const isLoggedIn =  localStorage.getItem("isLoggedIn");
    if(isLoggedIn === 'true'){
      return <NoteContainer />
    }
  return <SignIn />
}

export default HomePage