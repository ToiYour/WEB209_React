import { StyleProvider } from "@ant-design/cssinjs";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./global.css";
import "./styles/style.scss";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <StyleProvider hashPriority="low">
                <App />
            </StyleProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
