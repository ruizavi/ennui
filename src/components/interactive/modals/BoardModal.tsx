"use client";

import { CloseIcon } from "../../utils/icons/CloseIcon";
import { ModalProps } from "@/components/utils/modal/types";

export function BoardModal({
  closeModal,
  action,
}: ModalProps<{ action: (data: FormData) => Promise<unknown> }>) {
  return (
    <div>
      <header className="flex gap-4 items-center py-2">
        <button onClick={closeModal}>
          <CloseIcon width={24} height={24} className="hover:fill-[#C11D5A]" />
        </button>
        <h1>Add Board</h1>
      </header>
      <form action={action}>
        <label className="block py-2 font-medium">
          Title
          <input
            type="text"
            name="name"
            className="block w-full p-3 bg-slate-300 outline-none rounded-lg"
          />
        </label>
        <label className="block py-2 font-medium">
          Background
          <input
            type="url"
            name="background"
            className="block w-full p-3 bg-slate-300 outline-none rounded-lg"
          />
        </label>
        <button
          type="submit"
          className="bg-[#B78F77] bg-opacity-80 hover:bg-opacity-70 font-semibold p-2 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-rounded-tr-sm"
        >
          Save Board
        </button>
      </form>
    </div>
  );
}
