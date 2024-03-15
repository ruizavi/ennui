/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModalT } from "./types";

interface Props {
  modal: ModalT;
  closeModal: (modal: ModalT) => void;
  classNames?: {
    modal?: string;
    overlay?: string;
  };
}

const OVERLAY_MODAL_CLASSES =
  "absolute top-0 w-full h-screen bg-black bg-opacity-30";

const MODAL_CLASSES =
  "relative transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 shadow-lg opacity-0 top-1/2 left-1/2";

export function Modal(props: Props) {
  const { modal, closeModal, classNames } = props;
  const [isVisible, setIsVisible] = useState(true);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    const $modal = modalRef.current;
    const $modalOverlay = modalOverlayRef.current;

    if (!$modal || !$modalOverlay) return;

    setTimeout(() => {
      $modal.classList.add("opacity-0");
    }, 300);
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
    setTimeout(() => {
      closeModal(modal);
    }, 700);
  }, [modal]);

  const render = useCallback(
    (modal: ModalT) => {
      const C = modal.jsx;

      const props = modal.props?.data ?? {};

      return <C closeModal={handleClose} {...props} key={modal.modalId} />;
    },
    [modal.jsx]
  );

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      },
      false
    );

    return () =>
      document.addEventListener(
        "keydown",
        (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            handleClose();
          }
        },
        false
      );
  }, []);

  useEffect(() => {
    const $modal = modalRef.current;
    const $modalOverlay = modalOverlayRef.current;

    if (!$modal || !$modalOverlay) return;

    setIsVisible(true);

    setTimeout(() => {
      $modal.classList.remove("opacity-0");
    }, 300);
  }, []);

  const classes = useMemo(() => {
    const overlayClasses = classNames?.overlay?.split(" ") ?? [];
    const modalClasses = classNames?.modal?.split(" ") ?? [];

    const baseOverlayClasses = OVERLAY_MODAL_CLASSES.split(" ");
    const baseModalClasses = MODAL_CLASSES.split(" ");

    return {
      overlay: [...baseOverlayClasses, ...overlayClasses].join(" "),
      modal: [...baseModalClasses, ...modalClasses].join(" "),
    };
  }, [classNames?.modal, classNames?.overlay]);

  return (
    isVisible && (
      <div className={classes.overlay} ref={modalOverlayRef}>
        <div className={classes.modal} ref={modalRef}>
          {render(modal)}
        </div>
      </div>
    )
  );
}
