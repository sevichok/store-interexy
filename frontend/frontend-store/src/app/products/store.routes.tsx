import { isAuthenticated } from "../auth/store/auth.selectors";
import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAppSelector } from "store";


// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
    const isAuth = useAppSelector(isAuthenticated)
    return isAuth ? (
        <Suspense fallback={<div />}>
            <div><Element /></div>
        </Suspense>
    ) : (
        <Navigate to={"/auth/login"} />
    );
};

// ======= public route ======= //
// const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
//     <Suspense fallback={<div />}>
//         <Element />
//     </Suspense>
// );

// ======= pages ======= //
const ProductsPage = React.lazy(() => import("./products-main-page"));
const OrderPage = React.lazy(() => import("../order/order-page"));

const StoreRoutes = () => {
    return (
        <Routes>
            {/* PRIVATE */}
            <Route path={"/products"} element={<PrivateRoute element={ProductsPage} />} />

            {/* PRIVATE */}
            <Route path={"/order"} element={<PrivateRoute element={OrderPage} />} />

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to="/store/products" />} />
        </Routes>
    );
};

export default StoreRoutes;