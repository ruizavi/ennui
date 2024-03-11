"use client";

import React, { useEffect, useState } from "react";
import { ModalT } from "./types";
import { ModalState } from "./observer";
import { Modal } from "./Modal";

export function ModalContainer() {
  const [modals, setModals] = useState<ModalT[]>([]);

  useEffect(() => {
    ModalState.subscribe((modal) => {
      setModals((modals) => {
        const indexOfExistingToast = modals.findIndex(
          (t) => t.modalId === modal.modalId
        );

        if (indexOfExistingToast !== -1) {
          return [
            ...modals.slice(0, indexOfExistingToast),
            { ...modals[indexOfExistingToast], ...modal },
            ...modals.slice(indexOfExistingToast + 1),
          ];
        }

        return [modal, ...modals];
      });
    });
  }, []);

  const closeModal = React.useCallback(
    (modal: ModalT) =>
      setModals((modals) =>
        modals.filter(({ modalId }) => modalId !== modal.modalId)
      ),
    []
  );

  return (
    <section className="">
      {modals.map((modal) => (
        <Modal
          key={modal.modalId}
          modal={modal}
          closeModal={closeModal}
          {...modal.props}
        />
      ))}
    </section>
  );
}
