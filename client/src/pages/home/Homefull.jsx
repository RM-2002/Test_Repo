import "./home.css";
import Header from "../../components/header/Headername";
import Posts from "../../components/posts/Postsname";
import Sidebar from "../../components/sidebar/Sidebarname";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";


export default function Homefull() {

  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://mern-test-blog.onrender.com/api/posts"+search);
      setPosts(res.data);
    }
    fetchPosts();
  },[search])


  return (
    <>
       <Header/>
    <div className="home">
       
       <Posts posts={posts}/>
       <Sidebar/>
    </div>
     <Footer/>


    </>
  )
}
