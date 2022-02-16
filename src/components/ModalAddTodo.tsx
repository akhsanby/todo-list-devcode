import { useState } from "react";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";

import PriorityIndicator from "./PriorityIndicator";
import { useParams } from "react-router-dom";
import axios from "axios";

// types
import { ModalAddTodoProps, ModalEditTodoProps } from "../config/types";

const options = [
  {
    value: "very-high",
    label: (
      <div data-cy="modal-add-priority-item" className="d-flex align-items-center gap-2">
        <PriorityIndicator color="#ED4C5C" /> Very High
      </div>
    ),
  },
  {
    value: "high",
    label: (
      <div data-cy="modal-add-priority-item" className="d-flex align-items-center gap-2">
        <PriorityIndicator color="#F8A541" /> High
      </div>
    ),
  },
  {
    value: "medium",
    label: (
      <div data-cy="modal-add-priority-item" className="d-flex align-items-center gap-2">
        <PriorityIndicator color="#00A790" /> Medium
      </div>
    ),
  },
  {
    value: "low",
    label: (
      <div data-cy="modal-add-priority-item" className="d-flex align-items-center gap-2">
        <PriorityIndicator color="#428BC1" /> Low
      </div>
    ),
  },
  {
    value: "very-low",
    label: (
      <div data-cy="modal-add-priority-item" className="d-flex align-items-center gap-2">
        <PriorityIndicator color="#8942C1" /> Very Low
      </div>
    ),
  },
];

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: 205,
  }),
};

export default function ModalAddTodo({ showModal, setShowModal }: ModalAddTodoProps) {
  let params = useParams();

  const [item, setItem] = useState({
    activity_group_id: params.activityId,
    title: "",
    priority: "" || "very-high",
  });

  const handleSubmitNewTodo = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://todo.api.devcode.gethired.id/todo-items", item);
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  return (
    <Modal data-cy="modal-add" show={showModal} onHide={() => setShowModal(false)} centered>
      <div className="modal-content border-radius-12px">
        <Modal.Header>
          <Modal.Title data-cy="modal-add-title">Tambah List Item</Modal.Title>
          <Button data-cy="modal-add-close-button" type="button" className="btn-close" onClick={() => setShowModal(false)}></Button>
        </Modal.Header>
        <form onSubmit={handleSubmitNewTodo}>
          <Modal.Body>
            <div className="mb-3">
              <label data-cy="modal-add-name-title" htmlFor="exampleInputEmail1" className="text-uppercase text-12px fw-bold form-label">
                nama list item
              </label>
              <input onChange={(e) => setItem({ ...item, title: e.target.value })} data-cy="modal-add-name-input" type="text" className="form-control" id="exampleInputEmail1" placeholder="Tambahkan nama list item" />
            </div>
            <div className="mb-3">
              <label data-cy="modal-add-priority-title" htmlFor="exampleInputPassword1" className="text-uppercase text-12px fw-bold form-label">
                priority
              </label>
              <div data-cy="modal-add-priority-dropdown">
                <Select options={options} styles={customStyles} defaultValue={options[0]} onChange={(e) => setItem({ ...item, priority: e.value })} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {item.title === "" ? (
              <Button disabled variant="primary" data-cy="modal-add-save-button" type="submit" className="border-radius-45px px-4 py-2 text-white">
                Simpan
              </Button>
            ) : (
              <Button variant="primary" data-cy="modal-add-save-button" type="submit" className="border-radius-45px px-4 py-2 text-white">
                Simpan
              </Button>
            )}
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}

export function ModalEditTodo({ isActive, item, showModal, setShowModal }: ModalEditTodoProps) {
  let params = useParams();

  const [editedItem, setEditedItem] = useState({
    title: item.title,
    priority: item.priority,
    is_active: isActive,
  });

  const handleSubmitUpdatedTodo = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${item.id}`, editedItem);
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  return (
    <Modal data-cy="modal-add" show={showModal} onHide={() => setShowModal(false)} centered>
      <div className="modal-content border-radius-12px">
        <Modal.Header>
          <Modal.Title data-cy="modal-add-title">Tambah List Item</Modal.Title>
          <Button data-cy="modal-add-close-button" type="button" className="btn-close" onClick={() => setShowModal(false)}></Button>
        </Modal.Header>
        <form onSubmit={handleSubmitUpdatedTodo}>
          <Modal.Body>
            <div className="mb-3">
              <label data-cy="modal-add-name-title" htmlFor="exampleInputEmail1" className="text-uppercase text-12px fw-bold form-label">
                nama list item
              </label>
              <input onChange={(e) => setEditedItem({ ...item, title: e.target.value })} data-cy="modal-add-name-input" type="text" className="form-control" id="exampleInputEmail1" placeholder="Tambahkan nama list item" value={editedItem.title} />
            </div>
            <div className="mb-3">
              <label data-cy="modal-add-priority-title" htmlFor="exampleInputPassword1" className="text-uppercase text-12px fw-bold form-label">
                priority
              </label>
              <div data-cy="modal-add-priority-dropdown">
                <Select
                  options={options}
                  value={options.filter(function (option) {
                    return option.value === editedItem.priority;
                  })}
                  styles={customStyles}
                  defaultValue={options[0]}
                  onChange={(e) => setEditedItem({ ...item, priority: e.value })}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {item.title === "" ? (
              <Button disabled variant="primary" data-cy="modal-add-save-button" type="submit" className="border-radius-45px px-4 py-2 text-white">
                Simpan
              </Button>
            ) : (
              <Button variant="primary" data-cy="modal-add-save-button" type="submit" className="border-radius-45px px-4 py-2 text-white">
                Simpan
              </Button>
            )}
          </Modal.Footer>
        </form>
      </div>
    </Modal>
  );
}
