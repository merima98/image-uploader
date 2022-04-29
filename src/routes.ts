import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";

const LOGGED_OUT_USER = [
  {
    path: "/",
    element: Login,
  },
  {
    path: "/register",
    element: Registration,
  },
];

const LOGGED_IN_USER_ROUTES = [
  {
    path: "/",
    element: Home,
  },
];

export { LOGGED_OUT_USER, LOGGED_IN_USER_ROUTES };
