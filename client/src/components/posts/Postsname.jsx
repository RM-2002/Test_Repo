import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Postname";
import "./posts.css"; // Import CSS for posts component

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Logic to calculate the index of the first and last post on the current page
  const postsPerPage = 6; // Adjust as needed
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true when fetching posts
      try {
        const res = await axios.get("https://mern-test-blog.onrender.com/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching posts (success or failure)
      }
    };

    fetchPosts();
  }, []); // Run once on component mount

  return (
    <div className="posts-container">
      {loading ? ( // Display loader if loading is true
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Loading...</p>
        </div>
        
      ) : ( // Display posts if loading is false
        <>
          <div className="posts">
            {currentPosts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>

          {/* Pagination UI */}
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`pagination-button ${pageNumber === currentPage ? "active" : ""}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastPost >= posts.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
