import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
    <Suspense fallback={<div />}>
        <Element />
    </Suspense>
);

// ======= pages ======= //
const LoginPage = React.lazy(() => import("./login-page"));
const RegisterPage = React.lazy(() => import("./register-page"));

const AuthRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="/login" element={<PublicRoute element={LoginPage} />} />

            {/* PUBLIC */}
            <Route path="/register" element={<PublicRoute element={RegisterPage} />} />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};

export default AuthRoutes;