import { isAuthenticated } from "../src/app/auth/store/auth.selectors";
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAppSelector } from "store";


// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    const isAuth: boolean = useAppSelector(isAuthenticated)
    return isAuth ? (
        <Suspense fallback={<div />}>
            <div><Element /></div>
        </Suspense>
    ) : (
        <Navigate to={"/auth/login"} />
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
// const ProductsPage = React.lazy(() => import("./app/products/products-main-page"));
const StoreRoutes = React.lazy(() => import("./app/products/store.routes"));

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={"/auth/*"} element={<PublicRoute element={AuthRoutes} />} />

            {/* PRIVATE */}
            {/* <Route path={"/store/*"} element={<PrivateRoute element={ProductsPage} />} /> */}
            <Route path={"/store/*"} element={<PrivateRoute element={StoreRoutes} />} />

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};

export default AppRoutes;