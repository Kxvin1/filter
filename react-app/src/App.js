import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";

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

import { useLoadScript } from "@react-google-maps/api";

const string =
  "A-I-z-a-S-y-B-l-z-Q-y-z-B-A-v-X-s-Q-E-X-A-s-R-2-6-w-h-j-F-y-v-v-D-U-U-A-C-R-4";
const string2 = string.split("-").join("");

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
    googleMapsApiKey: string2,
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
