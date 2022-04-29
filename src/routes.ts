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

export { LOGGED_OUT_USER };
