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
          Splash Page Component
          <Footer />
        </Route>
        <ProtectedRoute path="/businesses/new" exact={true}>
          New Business Form Route
        </ProtectedRoute>
        <ProtectedRoute path={`/businesses/edit/:businessId`}>
          Edit Business Form Route
        </ProtectedRoute>
        <ProtectedRoute path={`/businesses/:businessId`}>
          Business Details Page
        </ProtectedRoute>
        <ProtectedRoute path={`/directions/:businessId`}>
          Directions Component
        </ProtectedRoute>
        <Route exact path="/search">
          Search Display/Results
        </Route>
        <Route>Page Not Found Component + Footer Component</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
