import Dashboard from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import AddProduct from "@/pages/(dashboard)/product/add/page";
import ProductManagementPage from "@/pages/(dashboard)/product/page";
import UpdateProduct from "@/pages/(dashboard)/product/update/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                    <Route
                        path="products"
                        element={<ProductManagementPage />}
                    />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route
                        path="products/:id/edit"
                        element={<UpdateProduct />}
                    />
                </Route>
            </Routes>
        </>
    );
};

export default Router;
