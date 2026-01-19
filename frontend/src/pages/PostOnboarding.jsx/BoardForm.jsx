import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBoard from "../../store/boardStore";
import QButton from "../../components/Qbutton";
import toast from "react-hot-toast";

const BoardForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { boards, createBoard, updateBoard, isLoading } = useBoard();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // 👉 Auto-fill when edit
  useEffect(() => {
    if (mode === "edit" && id) {
      const board = boards.find((b) => b._id === id);
      if (board) {
        setFormData({
          name: board.name,
          description: board.description || "",
        });
      }
    }
  }, [mode, id, boards]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Board name is required");
      return;
    }

    if (mode === "edit") {
      await updateBoard(id, formData);
    } else {
      await createBoard(formData);
    }

    navigate("/dashbord");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: 450 }}>
        <h5 className="text-center mb-3">
          {mode === "edit" ? "Edit Board" : "Create Board"}
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Board Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <QButton
            title={mode === "edit" ? "Update Board" : "Create Board"}
            fullWidth
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
