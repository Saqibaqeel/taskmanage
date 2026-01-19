import React, { useEffect,useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useBoard from "../../store/boardStore";
import useAuth from "../../store/authStore";
import QButton from "../../components/Qbutton";

const BoardsDashboard = () => {
  const navigate = useNavigate();
  const boards = useBoard((state) => state.boards)
  const fetchBoards = useBoard((state) => state.fetchBoards)
  const deleteBoard = useBoard((state) => state.deleteBoard)
  const isLoading = useBoard((state) => state.isLoading)

  const { authUser, logout } = useAuth();
   console.log(authUser,"=============================😊")
  const isAdmin = useMemo(
    () => authUser?.role === "admin",
    [authUser?.role]
  );

  const isEditor = useMemo(
    () => authUser?.role === "editor",
    [authUser?.role]
  );


  useEffect(() => {
    if(!authUser){
      navigate('/');
    }
  })
useEffect(() => {
  if (authUser) fetchBoards();
}, [authUser]);


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goToBoardLists = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Board Dashboard</h3>

        <div className="d-flex gap-2">
          {!authUser ? (
            <QButton
              title="Login"
              onClick={() => navigate("/login")}
            />
          ) : (
            <>
              {isAdmin && (
                <QButton
                  title="Role Management"
                  variant="outlined"
                  onClick={() => navigate("/admin/roles")}
                />
              )}

              <QButton
                title="Create Board"
                onClick={() => navigate("/boards/create")}
              />

              <QButton
                title="Logout"
                variant="outlined"
                color="error"
                onClick={handleLogout}
              />
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {!authUser && (
        <p className="text-muted text-center">
          Please login to view boards.
        </p>
      )}

      {authUser && !isLoading && boards.length === 0 && (
        <p className="text-muted">No boards created yet.</p>
      )}

      <div className="row">
        {authUser &&
          boards.map((board) => {
            const isOwner = board.owner === authUser?._id

            return (
              <div key={board._id} className="col-md-4 mb-3">
                <div
                  className="card shadow-sm p-3 h-100 border-0"
                  role="button"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToBoardLists(board._id)}
                >
                  <h5 className="fw-semibold">{board.name}</h5>
                  <p className="text-muted">
                    {board.description || "No description"}
                  </p>

                  {/* Stop click bubbling */}
                  <div
                    className="d-flex justify-content-between mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(isAdmin || isOwner || isEditor) && (
                      <QButton
                        title="Edit"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/boards/edit/${board._id}`)
                        }
                      />
                    )}

                    {(isAdmin || isOwner) && (
                      <QButton
                        title="Delete"
                        variant="outlined"
                        color="error"
                        onClick={() => deleteBoard(board._id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BoardsDashboard;
