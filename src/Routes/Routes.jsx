import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import College from "../components/College/College";
import CollegeDetails from "../components/CollegeDetails/CollegeDetails";
import Admission from "../components/Admission/Admission";
import MyCollege from "../components/MyCollege/MyCollege";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import ProfileRoute from "../components/ProfileRoute/ProfileRoute";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "college",
        element: <College></College>,
      },
      {
        path: "CollegeDetails/:id",
        element: <CollegeDetails></CollegeDetails>,
      },
      {
        path: "admission",
        element: <Admission></Admission>,
      },
      {
        path: "myCollege",
        element: <MyCollege></MyCollege>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "profileRoute",
        element: (
          <PrivateRoute>
            <ProfileRoute></ProfileRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
]);
