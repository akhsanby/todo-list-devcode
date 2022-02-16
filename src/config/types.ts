export type activityDataItem = {
  id: number;
  title: string;
  created_at: string;
};

export type activityItemProps = {
  item: activityDataItem;
};

export type ModalDeleteProps = {
  activityId: number;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

export type ModalDeleteItemProps = {
  item: any;
  showModalDeleteItem: boolean;
  setShowModalDeleteItem: (showModalDeleteItem: boolean) => void;
};

export type ModalAddTodoProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

export type ModalEditTodoProps = {
  isActive: boolean;
  item: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};
