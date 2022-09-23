import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../mutations/users";
import NoteContainer from "./NoteContainer";
import SignIn from "./SignIn";

const IsLoggedIn = () => {
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <NoteContainer /> : <SignIn />;
}
export default IsLoggedIn