import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaUser, FaComments, FaGithub, FaPlaneDeparture, FaHeart } from 'react-icons/fa';
import { DiReact } from "react-icons/di"
import { MdDashboard } from "react-icons/md"
import './SideBar.css'
import { FaLocationDot } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
    const navigate = useNavigate()
    return (
        <>
            <ProSidebar
                rtl={rtl}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
                style={{ background: '#373d3e' }}
            >
                <SidebarHeader>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'2rem'} color={"00bfff"} />
                        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Admin</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        // suffix={<span className="badge red">new</span>}
                        >
                            Dashboard
                            <Link to="/admin-dashboard/admin-DB" />
                        </MenuItem>
                    </Menu>

                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaUser />}
                        // suffix={<span className="badge red">new</span>}
                        >
                            Manage trips
                            <Link to="/admin-dashboard/manage-trips" />
                        </MenuItem>
                    </Menu>

                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaPlaneDeparture />}
                        // suffix={<span className="badge red">new</span>}
                        >
                            Manage Users
                            <Link to="/admin-dashboard/manage-users" />
                        </MenuItem>
                    </Menu>

                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaLocationDot />}
                        // suffix={<span className="badge red">new</span>}
                        >
                            Manage Locations
                            <Link to="/admin-dashboard/manage-locations" />
                        </MenuItem>
                    </Menu>

                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaComments />}
                        // suffix={<span className="badge red">new</span>}
                        >
                            Manage Comments
                            <Link to="#" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Team 35 CAP2
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default Sidebar; 