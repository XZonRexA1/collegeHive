import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import College from "../components/College/College";
import CollegeDetails from "../components/CollegeDetails/CollegeDetails";

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
        path: 'CollegeDetails/:id',
        element: <CollegeDetails></CollegeDetails>,
        
      }
    ],
  },
]);
