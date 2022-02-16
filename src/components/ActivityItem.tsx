import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// components
import ModalDelete, { AlertDelete } from "./ModalDelete";

// types
import { activityItemProps } from "../config/types";

// icons
import TrashIcon from "../img/icons/trash.svg";

export default function ActivityItem({ item }: activityItemProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activityId, setActivityId] = useState(null);

  return (
    <div data-cy="activity-item" className="card border-light shadow px-3 py-2 bg-body" style={{ height: "234px", width: "100%", borderRadius: "12px" }}>
      <div className="card-body d-flex flex-column justify-content-between">
        <Link to={`/detail/${item.id}`} className="text-decoration-none">
          <h5 data-cy="activity-item-title" className="card-title fw-bold">
            {item.title}
          </h5>
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <h6 data-cy="activity-item-date" className="card-subtitle text-muted">
            {moment(item.created_at).format("D MMMM YYYY")}
          </h6>
          <img
            onClick={() => {
              setShowModal(true);
              setActivityId(item.id);
            }}
            className="cursor-pointer"
            data-cy="activity-item-delete-icon"
            src={TrashIcon}
            alt="delete"
          />
          {showModal && <ModalDelete activityId={activityId} showModal={showModal} setShowModal={setShowModal} />}
        </div>
      </div>
    </div>
  );
}
