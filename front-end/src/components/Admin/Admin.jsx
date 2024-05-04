import Sidebar from "./Sidebar";
import './Admin.css'
import { FaBars } from 'react-icons/fa'
import { useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars className="text-xl ml-3 cursor-pointer text-white" onClick={() => { setCollapsed(!collapsed) }} />
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>

        </div>
    )
}

export default Admin;
