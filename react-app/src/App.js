import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";

// not using these
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import User from "./components/User";
// not using these

// ! import components here
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import NewBusinessForm from "./components/authenticated/BusinessForm";
import EditBusinessForm from "./components/authenticated/EditBusinessForm";
import BusinessDetails from "./components/authenticated/BusinessDetails";
import SearchBusiness from "./components/authenticated/SearchBusiness";
import PageNotFound from "./components/PageNotFound";

import Directions from "./components/authenticated/Directions";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const key = "AIzaSyBk4ZZCfn1TN-hg21AxnVM09w74yU2Gvh0"; // note: key is restricted to work on this site only

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Header isLoaded={loaded} />
      <Switch>
        <Route path="/" exact={true}>
          <Main />
          <Footer />
        </Route>
        <ProtectedRoute path="/businesses/new" exact={true}>
          <NewBusinessForm />
        </ProtectedRoute>
        <ProtectedRoute path={`/businesses/edit/:businessId`}>
          <EditBusinessForm />
        </ProtectedRoute>
        <ProtectedRoute path={`/businesses/:id`}>
          <BusinessDetails />
        </ProtectedRoute>
        <ProtectedRoute path={`/directions/:businessId`}>
          <Directions />
        </ProtectedRoute>
        <ProtectedRoute path={`/search/:id`}>
          <SearchBusiness />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
