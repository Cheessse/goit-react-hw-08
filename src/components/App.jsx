import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "../redux/auth/operations";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "./Loader/Loader";

const HomePage = lazy(() => import("../pages/Home"));
const RegisterPage = lazy(() => import("../components/Register/Register"));
const LoginPage = lazy(() => import("../pages/Login"));
const ContactsPage = lazy(() => import("../pages/Contacts"));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      {isRefreshing ? (
        <b>
          <Loader />
        </b>
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={RegisterPage} />} />
            <Route path="/login" element={<RestrictedRoute redirectTo="/contacts" component={LoginPage} />} />
            <Route path="/contacts" element={<PrivateRoute redirectTo="/login" component={ContactsPage} />} />
          </Routes>
        </Suspense>
      )}
    </Layout>
  );
};
