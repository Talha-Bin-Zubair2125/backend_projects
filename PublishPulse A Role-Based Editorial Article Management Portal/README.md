# PublishPulse – Multi-Role Content Management & Publishing System

PublishPulse is a full-stack MERN application (MongoDB, Express, React, Node.js) featuring role-based editorial workflows. It enables authors to draft and edit articles, admins/reviewers to inspect and approve pending posts, and regular users to browse published content.

---

## Project Structure

Based on the actual project file layout:

```text
backend_project_21/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   ├── middlewares/
│   │   ├── admin_middleware.js
│   │   └── authmiddleware.js
│   ├── models/
│   │   ├── post.js
│   │   └── user.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── .env
│   ├── db.js
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── create_post.jsx
    │   │   ├── delete_profile_admin.jsx
    │   │   ├── edit_draft.jsx
    │   │   ├── edit_profile.jsx
    │   │   ├── review_post.jsx
    │   │   ├── view_drafts.jsx
    │   │   ├── view_post.jsx
    │   │   ├── view_published_author.jsx
    │   │   └── view_published.jsx
    │   ├── context/
    │   │   └── authcontext.jsx
    │   ├── pages/
    │   │   ├── admin_dashboard/
    │   │   │   └── adminprofile.jsx
    │   │   ├── author_dashboard/
    │   │   │   └── authorprofile.jsx
    │   │   └── user_dashboard/
    │   │       ├── login.jsx
    │   │       ├── register.jsx
    │   │       └── userprofile.jsx
    │   ├── style/
    │   │   ├── adminprofile.css
    │   │   ├── authorprofile.css
    │   │   ├── createpost.css
    │   │   ├── delete_profile.css
    │   │   ├── edit_profile.css
    │   │   ├── login.css
    │   │   ├── register.css
    │   │   ├── review_post.css
    │   │   ├── userprofile.css
    │   │   ├── view_published_author.css
    │   │   ├── View_published.css
    │   │   └── viewdrafts.css
    │   ├── App.css
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json