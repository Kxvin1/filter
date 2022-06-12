import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";

// not using these
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import User from "./components/User";
// not using these

import { getKey } from "./store/key";

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
import ImageGallery from "./components/authenticated/ImageGallery";
// import MapContainer from "./components/authenticated/MapContainer";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const key = useSelector((state) => state.map.key);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

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
        <ProtectedRoute path="/businesses/:id" exact={true}>
          <BusinessDetails />
        </ProtectedRoute>
        <ProtectedRoute path="/businesses/:id/gallery" exact={true}>
          <ImageGallery />
        </ProtectedRoute>
        <ProtectedRoute path={`/directions/:businessId`}>
          {/* {<MapContainer />} */}
          {key && <Directions />}
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
