import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    const isAuthenticated = true;
    return isAuthenticated ? (
        <Suspense fallback={<div />}>
            <div><Element /></div>
        </Suspense>
    ) : (
        <Navigate to={""} />
    );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
    <Suspense fallback={<div />}>
        <Element />
    </Suspense>
);

// ======= pages ======= //
const AuthRoutes = React.lazy(() => import("./app/auth/auth.routes"));
const StorePage = React.lazy(() => import("./app/store/store-main-page"));

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />

            {/* PRIVATE */}
            <Route path={"/store/*"} element={<PrivateRoute element={StorePage} />} />

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to="/auth" />} />
        </Routes>
    );
};

export default AppRoutes;