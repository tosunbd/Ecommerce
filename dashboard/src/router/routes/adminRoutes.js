import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const Sellers = lazy(() => import("../../views/admin/Sellers"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const DeactivateSeller = lazy(() => import("../../views/admin/DeactivateSellers"));

export const adminRoutes = [
    {
        path: "admin/dashboard",
        element: <AdminDashboard />,
        ability: 'admin'
    },
    {
        path: "admin/dashboard/orders",
        element: <Orders />,
        ability: 'admin'
    },
    {
        path: "admin/dashboard/category",
        element: <Category />,
        ability: 'admin'
    },
    {
        path: "admin/dashboard/sellers",
        element: <Sellers />,
        ability: 'admin'
    },
    {
        path: "admin/dashboard/payment-request",
        element: <PaymentRequest />,
        ability: 'admin'
    },
    {
        path: "admin/dashboard/deactivate-sellers",
        element: <DeactivateSeller />,
        ability: 'admin'
    }
];
