import { ElementType } from "react";
import { ModalT, ModalOptions } from "./types";

class Observer {
  observers: ((modal: ModalT) => void)[] = [];
  modals: ModalT[] = [];

  subscribe = (observer: (modal: ModalT) => void) => {
    this.observers.push(observer);
  };

  publish = (modal: ModalT) => {
    this.observers.forEach((observer) => observer(modal));
  };

  addModal = (data: ModalT) => {
    this.publish(data);
    this.modals = [...this.modals, data];
  };
}

export const ModalState = new Observer();

const modalFunction = <T = unknown>(
  jsx: ElementType,
  options?: ModalOptions<T>
) => {
  const id = options?.modalId ?? crypto.randomUUID();

  ModalState.addModal({ jsx, props: options, modalId: id });

  return id;
};

const basicModal = modalFunction;

export const modal = Object.assign(basicModal, {});
