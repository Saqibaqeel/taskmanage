import React from 'react'
import { Routes,Route ,useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import { Toaster} from 'react-hot-toast'
import useAuth from './store/authStore';
import AuthForm from './pages/onboarding/AuthForm';
import BoardForm from './pages/PostOnboarding.jsx/BoardForm';
import BoardsDashboard from './pages/PostOnboarding.jsx/BoardsDashboard';
import RoleManagement from './pages/PostOnboarding.jsx/RoleManagement';
import BoardListForm from './pages/PostOnboarding.jsx/BoardListForm';
import BoardLists from './pages/PostOnboarding.jsx/BoardList';


function App() {
  const isLoading = useAuth((state) => state.isLoading);
  const userOnboarded = useAuth((state) => state.userOnboarded);
  const authUser = useAuth((state) => state.authUser);
  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={userOnboarded ? <BoardsDashboard /> : <AuthForm mode="login" />}
        />
        <Route path="/signup" element={<AuthForm mode="signup" />} />

        <Route
          path="/boards/create"
          element={userOnboarded ? <BoardForm mode="create" /> : <AuthForm mode="login" />}
        />

        <Route
          path="/boards/edit/:id"
          element={userOnboarded ? <BoardForm mode="edit" /> : <AuthForm mode="login" />}
        />

        <Route
          path="/dashbord"
          element={userOnboarded ? <BoardsDashboard /> : <AuthForm mode="login" />}
        />

        <Route
          path="/admin/roles"
          element={authUser?.role === 'admin' ? <RoleManagement /> : <AuthForm mode="login" />}
        />

        <Route
          path="/boards/:boardId/lists/create"
          element={userOnboarded ? <BoardListForm mode="create" /> : <AuthForm mode="login" />}
        />

        <Route
          path="/boards/:boardId/lists/edit/:boardListId"
          element={userOnboarded ? <BoardListForm mode="edit" /> : <AuthForm mode="login" />}
        />

        <Route
          path="/boards/:boardId"
          element={userOnboarded ? <BoardLists /> : <AuthForm mode="login" />}
        />
      </Routes>
    </>
  );
}

export default App