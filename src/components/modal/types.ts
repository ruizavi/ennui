import React from "react";

export type Id = string | number;

export type ModalPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "middle-right"
  | "middle-center"
  | "middle-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

export type ModalContentProps<T = unknown> = {
  closeModal: () => void;
} & T;

export type ModalContent<T = unknown> =
  | ((props: ModalContentProps<T>) => React.ReactElement<T>)
  | React.ReactElement<T>;

export interface ModalOptions<Data = unknown> {
  modalId?: Id;
  classNames?: {
    modal?: string;
    overlay?: string;
  };
  onOpen?: () => void;
  onClose?: () => void;
  data?: Data;
  isLoading?: boolean;
  position?: ModalPosition;
}

export interface ModalProps extends ModalOptions {}

export interface ModalT {
  content: ModalContent<any>;
  props?: Omit<ModalProps, "modalId">;
  modalId: Id;
}
