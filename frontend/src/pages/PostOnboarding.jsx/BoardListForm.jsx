import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBoardList from "../../store/boardList";
import QButton from "../../components/Qbutton";
import toast from "react-hot-toast";

const BoardListForm = ({ mode = "create" }) => {
  const { boardId, boardListId } = useParams();
  const navigate = useNavigate();

  const {
    boardLists,
    createBoardList,
    updateBoardList,
    isLoading,
  } = useBoardList();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    labels: "",
  });

  // Prefill when edit
  useEffect(() => {
    if (mode === "edit") {
      const list = boardLists.find((l) => l._id === boardListId);
      if (!list) return;

      setFormData({
        title: list.title,
        description: list.description || "",
        dueDate: list.dueDate?.slice(0, 10) || "",
        labels: list.labels?.join(", ") || "",
      });
    }
  }, [mode, boardListId, boardLists]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const payload = {
      ...formData,
      labels: formData.labels
        ? formData.labels.split(",").map((l) => l.trim())
        : [],
    };

    if (mode === "edit") {
      await updateBoardList(boardListId, payload);
    } else {
      await createBoardList(boardId, payload);
    }

    navigate(-1);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 450 }}>
        <h4 className="text-center mb-3">
          {mode === "edit" ? "Edit List" : "Create List"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            className="form-control mb-3"
            placeholder="List title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            className="form-control mb-3"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <input
            name="labels"
            className="form-control mb-3"
            placeholder="bug, urgent, frontend"
            value={formData.labels}
            onChange={handleChange}
          />

          <QButton
            title={mode === "edit" ? "Update" : "Create"}
            fullWidth
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default BoardListForm;
