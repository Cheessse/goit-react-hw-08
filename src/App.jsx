import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { refreshUser } from "./redux/auth/operations";
import { useAuth } from "./hooks/useAuth";
import { Loader } from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegistrationPage/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LogInPage/LogInPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));

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
