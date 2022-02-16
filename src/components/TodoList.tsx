import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// components
import Layout from "./Layout";
import TodoItem from "./TodoItem";
import ModalAddTodo from "./ModalAddTodo";
import ModalDelete, { AlertDelete } from "./ModalDelete";

// image and icons
import todoImage from "../img/todo-empty-state.svg";
import pencilIcon from "../img/icons/pencil.svg";
import plusIcon from "../img/icons/plus.svg";
import arrowLeftIcon from "../img/icons/arrow-left.svg";
import arrowSortIcon from "../img/icons/arrow-sort.svg";
import newestSortIcon from "../img/icons/newest-sort.svg";
import oldestSortIcon from "../img/icons/oldest-sort.svg";
import azSortIcon from "../img/icons/az-sort.svg";
import zaSortIcon from "../img/icons/za-sort.svg";
import undoneSortIcon from "../img/icons/undone-sort.svg";
import selectedSortIcon from "../img/icons/selected-sort.svg";

export default function TodoList() {
  const [todoData, setTodoData] = useState<any>();
  const [isActivityTitleEdited, setActivityTitleEdited] = useState<boolean>(false);
  const [activityTitle, setActivityTitle] = useState<string>("");

  // modal
  const [showModal, setShowModal] = useState<boolean>(false);

  let params = useParams();

  async function fetchActivityListFromAPI(activityId: any) {
    try {
      const response = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${activityId}?email=akhsanby%40gmail.com`);
      setTodoData(response.data);
      setActivityTitle(response.data.title);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditTodoTitle = async (activityTitle: string) => {
    setActivityTitle(activityTitle);
    try {
      const response = await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${params.activityId}?email=akhsanby%40gmail.com`, {
        title: activityTitle,
      });
      console.log(`Status ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivityListFromAPI(params.activityId);
  }, [todoData]);

  return (
    <Layout>
      <div className="container d-flex justify-content-between align-items-center" style={{ marginTop: "30px" }}>
        <div className="d-flex" style={{ fontSize: "36px" }}>
          <Link to="/">
            <img data-cy="todo-back-button" src={arrowLeftIcon} alt="back" />
          </Link>
          {isActivityTitleEdited ? (
            <input type="text" className="fw-bold bg-transparent outline-none" value={activityTitle} onChange={(e: any) => handleEditTodoTitle(e.target.value)} style={{ margin: "0 30px" }} />
          ) : (
            <p className="fw-bold" data-cy="todo-title" style={{ margin: "0 30px" }} onClick={() => setActivityTitleEdited(!isActivityTitleEdited)}>
              {activityTitle}
            </p>
          )}
          <img data-cy="todo-title-edit-button" className="cursor-pointer" src={pencilIcon} alt="edit" onClick={() => setActivityTitleEdited(!isActivityTitleEdited)} />
        </div>
        <div className="d-flex align-items-center gap-3">
          <Sort />
          <button onClick={() => setShowModal(true)} type="button" data-cy="todo-add-button" className="text-white btn btn-primary d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#addTodo" style={{ fontWeight: "600", fontSize: "18px", borderRadius: "45px", padding: "13px 21px 13px 14px" }}>
            <img src={plusIcon} alt="add" />
            Tambah
          </button>
          <ModalAddTodo showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
      <div className="container d-flex my-3">
        {todoData?.todo_items?.length > 0 ? (
          <div className="vw-100 row">
            {todoData?.todo_items.map((item) => (
              <div className="col-12" key={item.id}>
                <TodoItem item={item} />
              </div>
            ))}
          </div>
        ) : (
          <img data-cy="todo-empty-state" className="m-auto" src={todoImage} alt="todo" />
        )}
      </div>
    </Layout>
  );
}

function Sort() {
  const dropDownSort = [
    { src: newestSortIcon, alt: "newest", name: "Terbaru", isSelected: true },
    { src: oldestSortIcon, alt: "oldest", name: "Terlama", isSelected: false },
    { src: azSortIcon, alt: "az", name: "A-Z", isSelected: false },
    { src: zaSortIcon, alt: "za", name: "Z-A", isSelected: false },
    { src: undoneSortIcon, alt: "undone", name: "Belum Selesai", isSelected: false },
  ];

  return (
    <div className="dropdown">
      <div data-cy="todo-sort-button" className="rounded-circle p-3" data-bs-toggle="dropdown" aria-expanded="false" style={{ border: "1px solid #E5E5E5", cursor: "pointer" }}>
        <img src={arrowSortIcon} alt="sort" />
      </div>
      <ul data-cy="sort-parent" className="shadow border-0 dropdown-menu p-0" style={{ width: "13rem", borderRadius: "6px" }}>
        {dropDownSort.map((item, i) => (
          <li key={i} data-cy="sort-selection" className="dropdown-item list-group-item d-flex justify-content-between align-items-center cursor-pointer">
            <div className="d-flex gap-2">
              <img data-cy="sort-selection-icon" src={item.src} alt={item.alt} />
              <span data-cy="sort-selection-title">{item.name}</span>
            </div>
            <img data-cy="sort-selection-selected" src={item.isSelected ? selectedSortIcon : ""} alt={item.isSelected ? item.alt : ""} />
          </li>
        ))}
      </ul>
    </div>
  );
}
