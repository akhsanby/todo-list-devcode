import React, { useState } from "react";
import PriorityIndicator from "./PriorityIndicator";

// icons
import pencilIcon from "../img/icons/pencil.svg";
import trashIcon from "../img/icons/trash.svg";
import ModalAddTodo, { ModalEditTodo } from "./ModalAddTodo";
import { ModalDeleteItem } from "./ModalDelete";

export default function TodoItem({ item }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDeleteItem, setShowModalDeleteItem] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);

  const priorityColor = () => {
    if (item.priority === "very-low") return "#8942C1";
    if (item.priority === "low") return "#428BC1";
    if (item.priority === "medium") return "#00A790";
    if (item.priority === "high") return "#F8A541";
    if (item.priority === "very-high") return "#ED4C5C";
  };

  return (
    <div data-cy="todo-item" className="card my-1 border-radius-12px shadow" style={{ height: "80px" }}>
      <div className="card-body d-flex justify-content-between align-items-center mx-3">
        <div className="d-flex justify-content-start align-items-center gap-3">
          <input onChange={(e) => setActive(e.target.checked)} data-cy="todo-item-checkbox" className="form-check-input" type="checkbox" style={{ borderRadius: 0 }} />
          <PriorityIndicator color={priorityColor()} />
          <p data-cy="todo-item-title" className={`m-0 ${isActive ? "text-decoration-line-through text-muted" : ""}`} style={{ fontSize: "18px", fontWeight: 500 }}>
            {item.title}
          </p>
          <img className="cursor-pointer" onClick={() => setShowModal(true)} data-cy="todo-item-edit-button" src={pencilIcon} alt="edit" />
          {showModal && <ModalEditTodo isActive={isActive} item={item} showModal={showModal} setShowModal={setShowModal} />}
        </div>
        <img className="cursor-pointer" onClick={() => setShowModalDeleteItem(true)} data-cy="todo-item-delete-button" src={trashIcon} alt="delete" />
        {showModalDeleteItem && <ModalDeleteItem item={item} showModalDeleteItem={showModalDeleteItem} setShowModalDeleteItem={setShowModalDeleteItem} />}
      </div>
    </div>
  );
}
