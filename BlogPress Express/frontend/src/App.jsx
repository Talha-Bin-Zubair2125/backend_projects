import { useState } from "react";
import "./App.css";

function App() {
  // States
  let [blogid, setblogid] = useState(0);
  let [blogheading, setblogheading] = useState("");
  let [blogcontent, setblogcontent] = useState("");
  let [blogauthorname, setauthorname] = useState("");
  let [blogpublisheddate, setpublisheddata] = useState("");
  let [blogdata, setblogdata] = useState([]);
  let [response, setresponse] = useState("");
  let [searchbyauthor, setsearch] = useState("");
  // Function for Data Saving
  let SaveData = () => {
    let ID = blogid + 1;
    setblogid(ID);

    let BlogData = {
      ID: blogid,
      Blog_Heading: blogheading,
      Blog_Content: blogcontent,
      Blog_Author: blogauthorname,
      Blog_Published_Date: blogpublisheddate,
    };

    setblogdata([...blogdata, BlogData]);

    // Passing Data As a Param to Async Function -- SendBlogData()
    SendBlogData(BlogData);
  };

  // POST Req -- EndPoint (/AddBlog)
  let SendBlogData = async (Blogs) => {
    const res = await fetch("http://localhost:3000/blogs/AddBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Blogs),
    });
    const data = await res.json();
    setresponse(data);
  };

  // GET Req -- EndPoint (/GetBlogs)
  let GetBlogsData = async () => {
    const res = await fetch("http://localhost:3000/blogs/GetBlogs");
    const data = await res.json();
    setresponse(data);
  };

  // GET Req -- EndPoint (/:authorname)
  let SearchBlogs = async () => {
    const res = await fetch(`http://localhost:3000/blogs/${searchbyauthor}`);
    const data = await res.json();
    setresponse(data);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">📝 Blog Manager</h1>

        <div className="form-container">
          {/* Blog ID */}
          <div className="form-group">
            <label>Enter Blog ID</label>
            <input type="number" disabled value={blogid} />
          </div>

          {/* Blog Heading */}
          <div className="form-group">
            <label>Enter Blog Heading</label>
            <input
              type="text"
              placeholder="e.g. My First Blog"
              value={blogheading}
              onChange={(e) => {
                setblogheading(e.target.value);
              }}
            />
          </div>

          {/* Blog Content */}
          <div className="form-group">
            <label>Enter Blog Content</label>
            <textarea
              rows={10}
              placeholder="Write your blog content here..."
              value={blogcontent}
              onChange={(e) => {
                setblogcontent(e.target.value);
              }}
            />
          </div>

          {/* Blog Author */}
          <div>
            <label>Enter Author Name</label>
            <input
              type="text"
              placeholder="Enter Author Name"
              value={blogauthorname}
              onChange={(e) => {
                setauthorname(e.target.value);
              }}
            />
          </div>

          {/* Blog Published Date */}
          <div>
            <label>Enter Published Date</label>
            <input
              type="date"
              value={blogpublisheddate}
              onChange={(e) => {
                setpublisheddata(e.target.value);
              }}
            />
          </div>

          {/* Blog Search */}
          <div>
            <label>Enter the Blog You Want to Search</label>
            <input
              type="text"
              value={searchbyauthor}
              placeholder="Enter Author Name For Blog Search"
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button className="save-btn" onClick={() => SaveData()}>
              Save Data
            </button>
            <button className="get-btn" onClick={() => GetBlogsData()}>
              Get Blogs
            </button>
            <button onClick={() => SearchBlogs()}>Search</button>
          </div>

          {response && (
            <div className="response-box">
              <h3>📤 Backend Response:</h3>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
