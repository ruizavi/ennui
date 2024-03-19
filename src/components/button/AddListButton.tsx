"use client";

import { AddIcon } from "../icons/AddIcon";
import { ListModal } from "../lists/ListModal";
import { modal } from "../utils/modal/observer";

const modalCall = (id: string) =>
  modal<{ boardId: string }>(ListModal, {
    data: { boardId: id },
    classNames: {
      modal: "w-[512px] bg-white p-4 rounded-lg z-50",
      overlay: "z-50",
    },
  });

export const AddList = ({ boardId }: { boardId: string }) => (
  <button
    className="group min-w-[256px] w-[256px] p-2 bg-none outline-none border-dashed h-[56px] border-2 border-white hover:border-white/60"
    onClick={() => modalCall(boardId)}
  >
    <AddIcon
      className=" group-hover:fill-white/60 fill-white mx-auto"
      width={30}
      height={30}
    />
  </button>
);
