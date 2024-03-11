import { useCallback, useState } from "react";
import { Id, ModalT } from "./types";

interface Props {
  modal: ModalT;
  closeModal: (modal: ModalT) => void;
}

export function Modal(props: Props) {
  const { modal, closeModal } = props;
  const [isVisible, setIsVisible] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClose = useCallback(() => closeModal(modal), [modal]);

  const render = useCallback((modal: ModalT) => {
    const C: any = modal.content;

    const props = modal.props?.data ?? {};

    return <C closeModal={handleClose} {...props} key={modal.modalId} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{isVisible && render(modal)}</div>;
}
