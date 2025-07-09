import { Route, Switch } from "react-router";
import LoginPage from "../Components/Auth/LoginPage/LoginPage";
import RegPage from "../Components/Auth/RegPage/RegPage";
import ChatPage from "../Components/ChatPage/ChatPage";


function PageManager() {



    return <>

        <Switch>
            <Route path={'/chat'} component={ChatPage}/>
            <Route path={'/reg'} component={RegPage}/>
            <Route path={'/'} component={LoginPage}/>

        </Switch>
    
    </>
}

export default PageManager;
