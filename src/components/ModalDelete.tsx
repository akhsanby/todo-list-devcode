import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

// icons
import modalDeleteIcon from "../img/icons/modal-delete.svg";
import alertDeleteIcon from "../img/icons/modal-information.svg";
import TrashIcon from "../img/icons/trash.svg";

// types
import { ModalDeleteProps, ModalDeleteItemProps } from "../config/types";

export default function ModalDelete({ activityId, showModal, setShowModal }: ModalDeleteProps) {
  const handleDeleteActivity = async (id: number) => {
    try {
      const response = await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`);
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal data-cy="modal-delete" show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="d-flex flex-column my-3">
          <img data-cy="modal-delete-icon" className="m-auto" src={modalDeleteIcon} alt="deleteIcon" />
          <p data-cy="modal-delete-title" className="px-5 text-center mt-4 mb-5" style={{ fontWeight: "500" }}>
            Apakah anda yakin menghapus activity <span className="fw-bold d-block">"This Activity"?</span>
          </p>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <Button className="border-radius-45px px-5 py-2" data-cy="modal-delete-cancel-button" variant="secondary" onClick={() => setShowModal(false)} style={{ fontWeight: "600" }}>
              Batal
            </Button>
            <Button className="border-radius-45px text-white px-5 py-2" data-cy="modal-delete-confirm-button" variant="danger" onClick={() => handleDeleteActivity(activityId)} style={{ fontWeight: "600" }}>
              Simpan
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export function ModalDeleteItem({ item, showModalDeleteItem, setShowModalDeleteItem }: ModalDeleteItemProps) {
  const handleDeleteItem = async () => {
    try {
      const response = await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${item.id}`);
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal data-cy="modal-delete" show={showModalDeleteItem} onHide={() => setShowModalDeleteItem(false)} centered>
        <Modal.Body className="d-flex flex-column my-3">
          <img data-cy="modal-delete-icon" className="m-auto" src={modalDeleteIcon} alt="deleteIcon" />
          <p data-cy="modal-delete-title" className="px-5 text-center mt-4 mb-5" style={{ fontWeight: "500" }}>
            Apakah anda yakin menghapus item <span className="fw-bold d-block">"{item.title}"?</span>
          </p>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <Button className="border-radius-45px px-5 py-2" data-cy="modal-delete-cancel-button" variant="secondary" onClick={() => setShowModalDeleteItem(false)} style={{ fontWeight: "600" }}>
              Batal
            </Button>
            <Button className="border-radius-45px text-white px-5 py-2" data-cy="modal-delete-confirm-button" variant="danger" onClick={handleDeleteItem} style={{ fontWeight: "600" }}>
              Simpan
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export function AlertDelete() {
  return (
    <div data-cy="modal-information" className="shadow modal fade" id="alertDelete">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-radius-12px">
          <div className="modal-body d-flex align-items-center gap-2">
            <img data-cy="modal-information-icon" src={alertDeleteIcon} alt="alertDelete" />
            <span data-cy="modal-information-title" style={{ fontSize: "14px", fontWeight: "500" }}>
              Activity berhasil dihapus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function ModalDelete({ activityId, showModal, setShowModal }) {
//   const handleDeleteActivity = async (id) => {
//     try {
//       const response = await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`);
//       console.log(response.status);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div data-cy="modal-delete" id="deleteModal" className="shadow modal fade">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content border-radius-12px">
//             <div className="modal-body d-flex flex-column my-3">
//               <img data-cy="modal-delete-icon" className="m-auto" src={modalDeleteIcon} alt="deleteIcon" />
//               <p data-cy="modal-delete-title" className="px-5 text-center mt-4 mb-5" style={{ fontWeight: "500" }}>
//                 Apakah anda yakin menghapus activity <span className="fw-bold d-block">"This Activity"?</span>
//               </p>
//               <div className="d-flex justify-content-center align-items-center gap-4">
//                 <button onClick={() => console.log(activityId)} data-cy="modal-delete-cancel-button" type="button" className="border-radius-45px btn btn-secondary px-5 py-2" data-bs-dismiss="modal" style={{ fontWeight: "600" }}>
//                   Batal
//                 </button>
//                 <button data-cy="modal-delete-confirm-button" type="button" className="border-radius-45px text-white btn btn-danger px-5 py-2" style={{ fontWeight: "600" }}>
//                   Hapus
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
