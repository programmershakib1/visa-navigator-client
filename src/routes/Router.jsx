import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/Home/Home";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import ForgetPassword from "../components/ForgetPassword/ForgetPassword";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import AllVisas from "../components/AllVisas/AllVisas";
import AddVisa from "../components/AddVisa/AddVisa";
import MyAddedVisas from "../components/MyAddedVisas/MyAddedVisas";
import VisaDetails from "../components/VisaDetails/VisaDetails";
import MyVisaApplications from "../components/MyVisaApplications/MyVisaApplications";
import Profile from "../components/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://assignment-10-b10-server.vercel.app/latestVisas"),
      },
      {
        path: "/allVisas",
        element: <AllVisas></AllVisas>,
      },
      {
        path: "/addVisa",
        element: (
          <PrivateRoute>
            <AddVisa></AddVisa>
          </PrivateRoute>
        ),
      },
      {
        path: "/myAddedVisas",
        element: (
          <PrivateRoute>
            <MyAddedVisas></MyAddedVisas>
          </PrivateRoute>
        ),
      },
      {
        path: "/myVisaApplications",
        element: (
          <PrivateRoute>
            <MyVisaApplications></MyVisaApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "/visaDetails/:id",
        element: (
          <PrivateRoute>
            <VisaDetails></VisaDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-10-b10-server.vercel.app/visas/${params.id}`
          ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
