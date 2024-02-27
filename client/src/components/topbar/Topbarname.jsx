import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import pic from "../../assets/no_image.jpeg";
import { Context } from "../../context/Context";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://mern-test-blog.onrender.com/images/"
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://www.facebook.com/profile.php?id=61556676692956&is_tour_completed=true" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-facebook-square" style={{color:"#316FF6"}}></i>
        </a>
        <a href="https://www.instagram.com/inkinsight12/" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-instagram-square" style={{color:"#E4405F"}}></i>
        </a>
        <a href="https://in.pinterest.com/inkinsight12/_created/" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-pinterest-square" style={{color:"#c8232c"}}></i>
        </a>
        <a href="https://twitter.com/inkinsight12" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-twitter-square" style={{color:"#1DA1F2"}}></i>
        </a>
                
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem topBarItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem topBarItem">
            <Link className="link" to="/about">ABOUT</Link></li>

          <li className="topListItem topBarItem">
            {" "}
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem topBarItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
             <img className="topImg" src={user.profilePic ? PF + user.profilePic : pic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem authenticationBtn">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem authenticationBtn">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
