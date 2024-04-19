import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Header";
import { setDataLocation } from "../redux/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//Root layout là nơi sẽ render ra giao diện của trang NavBar
const RootLayout = () => {
  const API = process.env.REACT_APP_SERVER_DOMAIN;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}locations/`);
      const resData = await res.json();
      dispatch(setDataLocation(resData));
    })();
  }, []);

  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <div className="root-layout">
      <Toaster />
      {showHeader && <Header />}
      {/* Outlet sẽ hiển thị nội dung của route được kích hoạt trong ParentComponent. 
            Bất cứ khi nào bạn truy cập một đường dẫn được chỉ định trong Route, 
            Outlet sẽ hiển thị nội dung của route đó. */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
