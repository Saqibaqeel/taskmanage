import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBoardList from "../../store/boardList";
import useAuth from "../../store/authStore";
import QButton from "../../components/Qbutton";

const BoardLists = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const { boardLists, fetchBoardLists, deleteBoardList, isLoading } =
    useBoardList();

  const { authUser } = useAuth();

  useEffect(() => {
    fetchBoardLists(boardId);
  }, [boardId]);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Board Lists</h4>

        {/* Everyone can create */}
        <QButton
          title="Create List"
          onClick={() =>
            navigate(`/boards/${boardId}/lists/create`)
          }
        />
      </div>

      {/* Content */}
      {isLoading && <p>Loading lists...</p>}

      {!isLoading && boardLists.length === 0 && (
        <p className="text-muted">No lists yet</p>
      )}

      <div className="row">
        {boardLists.map((list) => {
          const isOwner = list.createdBy === authUser?._id;
          const isAdmin = authUser?.role === "admin";
          const isEditor = authUser?.role === "editor";

          const canEdit = isAdmin || isOwner || isEditor;
          const canDelete = isAdmin || isOwner;

          return (
            <div key={list._id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h6 className="fw-bold">{list.title}</h6>
                  <p className="text-muted small">
                    {list.description || "No description"}
                  </p>

                  {list.dueDate && (
                    <span className="badge bg-info">
                      Due:{" "}
                      {new Date(list.dueDate).toLocaleDateString()}
                    </span>
                  )}

                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    {canEdit && (
                      <QButton
                        title="Edit"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/boards/${boardId}/lists/edit/${list._id}`
                          )
                        }
                      />
                    )}

                    {canDelete && (
                      <QButton
                        title="Delete"
                        variant="outlined"
                        color="error"
                        onClick={() => deleteBoardList(list._id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardLists;
