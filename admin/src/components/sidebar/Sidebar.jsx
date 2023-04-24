import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi"; 
import { CgProfile } from "react-icons/cg";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useCallback } from "react";
import { logoutUser } from "../../redux/apiCalls";



export default function Sidebar() {
  //  const { dispatch } = useContext(DarkModeContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const handleLogout = useCallback(() => {
      
      logoutUser();
    }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/analytics" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics User
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/offer" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Offer
              </li>
            </Link>
            <Link to="/transactions" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <CgProfile className="sidebarIcon" />
              Profile
            </li>
            <li onClick={handleLogout} className="sidebarListItem">
              <BiLogOutCircle className="sidebarIcon" />
              Logout
            </li>
          </ul>
          <div className="bottom">
            <div
              className="colorOption"
              onClick={() => {
                toggle();
              }}
            ></div>
            <div
              className="colorOption"
              onClick={() => {
                toggle();
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
