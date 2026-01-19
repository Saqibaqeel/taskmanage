import React, { useEffect } from "react";
import useAdminStore from "../../store/adimStore";
import useAuth from "../../store/authStore";
import QButton from "../../components/Qbutton";
import { Link } from "react-router-dom";

const RoleManagement = () => {
  const { makeAdim, makeEditor, makeViewer, isLoading } = useAdminStore();
  const { users, getAllUsers, authUser } = useAuth();

  useEffect(() => {
    getAllUsers();
  }, [users]);

  useEffect(() => {
    if(authUser?.role !== "admin"){
     <Link to ="/dashbord"/>
    }
  }, [authUser]);


  const isAdmin = authUser?.role === "admin";

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4">Role Management</h3>

      <div className="card shadow-sm border-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {isAdmin && <th className="text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {users?.length > 0 && users?.map((user) => (
              user?._id !== authUser._id && (    
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge text-uppercase ${
                      user.role === "admin"
                        ? "bg-danger"
                        : user.role === "editor"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {isAdmin && (
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <QButton
                        title="Admin"
                        variant="outlined"
                        onClick={() => makeAdim(user._id)}
                        loading={isLoading}
                        disabled={user.role === "admin"}
                      />

                      <QButton
                        title="Editor"
                        variant="outlined"
                        onClick={() => makeEditor(user._id)}
                        loading={isLoading}
                        disabled={user.role === "editor"}
                      />

                      <QButton
                        title="Viewer"
                        variant="outlined"
                        onClick={() => makeViewer(user._id)}
                        loading={isLoading}
                        disabled={user.role === "viewer"}
                      />
                    </div>
                  </td>
                )}
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
