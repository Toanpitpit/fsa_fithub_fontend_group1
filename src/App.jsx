import "bootstrap/dist/css/bootstrap.min.css";

import SwitchRouters from "./routers/Routers";
import { NotificationToast } from "./components/NotificationToast";

export default function App() {
  return (
    <>
      <NotificationToast />
      <SwitchRouters />
    </>
  );
}
