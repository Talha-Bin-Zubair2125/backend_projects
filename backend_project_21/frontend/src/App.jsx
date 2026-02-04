import Register from "./pages/user_dashboard/register";
import Login from "./pages/user_dashboard/login";
import Userprofile from "./pages/user_dashboard/userprofile";
import Adminprofile from "./pages/admin_dashboard/adminprofile";
import Authorprofile from "./pages/author_dashboard/authorprofile";
import Edit_profile from "./components/edit_profile";
import Delete_profile_admin from "./components/delete_profile_admin";
import Create_post from "./components/create_post";
import View_drafts from "./components/view_drafts";
import Edit_draft from "./components/edit_draft";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/admindashboard" element={<Adminprofile />} />
          <Route path="/authordashboard" element={<Authorprofile />} />
          <Route path="/editprofile/:id" element={<Edit_profile />} />
          <Route path="/deleteprofile/:id" element={<Delete_profile_admin />} />
          <Route path="/createpost" element={<Create_post />} />
          <Route path="/drafts" element={<View_drafts />} />
          <Route path="/editdraft/:id" element={<Edit_draft />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
