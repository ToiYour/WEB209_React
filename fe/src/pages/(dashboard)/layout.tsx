import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div className="flex items-start max-h-screen">
            <Sidebar />
            <main className="flex-1 p-5">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
