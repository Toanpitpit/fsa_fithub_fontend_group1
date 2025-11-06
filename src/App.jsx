import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar";
import AuthenticationPage from "./pages/Authentication";
import ProfileUser from "./components/profile";
import ViewProfile from "./pages/ViewProfilePage";


export default function App() {
  return ( 
    // <ViewProfile id = {1}></ViewProfile>
    // <AuthenticationPage></AuthenticationPage>
    <Sidebar></Sidebar>
  )
}
