import { Link } from "react-router-dom";
import axios from "axios";

// components
import Layout from "./Layout";
import { useEffect, useState } from "react";

// components
import ActivityItem from "./ActivityItem";
import ModalDelete, { AlertDelete } from "./ModalDelete";

// image and icon
import activityImage from "../img/activity-empty-state.svg";
import plusIcon from "../img/icons/plus.svg";

// types
import { activityDataItem } from "../config/types";

export default function ActivityList() {
  const [activityData, setActivityData] = useState([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  async function fetchActivityListFromAPI() {
    try {
      const response = await axios.get("https://todo.api.devcode.gethired.id/activity-groups?email=akhsanby%40gmail.com");
      const result = response.data.data;
      setActivityData(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateNewActivity = async () => {
    try {
      const response = await axios.post("https://todo.api.devcode.gethired.id/activity-groups", {
        title: "New Activity",
        email: "akhsanby@gmail.com",
      });
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivityListFromAPI();
  }, [activityData]);

  return (
    <Layout>
      <div className="container d-flex justify-content-between align-items-center" style={{ marginTop: "30px" }}>
        <p data-cy="activity-title" className="fw-bold" style={{ fontSize: "36px" }}>
          Activity
        </p>
        <button onClick={handleCreateNewActivity} data-cy="activity-add-button" className="text-white btn btn-primary d-flex justify-content-center align-items-center" style={{ fontWeight: "600", fontSize: "18px", borderRadius: "45px", padding: "13px 21px 13px 14px" }}>
          <img src={plusIcon} alt="add" />
          Tambah
        </button>
      </div>
      <div className="container d-flex my-3">
        {activityData ? (
          <div className="row" style={{ rowGap: "26px" }}>
            {activityData?.map((item: activityDataItem) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                <ActivityItem item={item} />
              </div>
            ))}
          </div>
        ) : (
          <img data-cy="activity-empty-state" className="m-auto" src={activityImage} alt="activity" />
        )}
      </div>
    </Layout>
  );
}
