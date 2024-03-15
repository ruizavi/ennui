"use client";

import { useForm } from "react-hook-form";
import { CloseIcon } from "../icons/CloseIcon";
import { ModalProps } from "../utils/modal/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "@/libs/zod";
import { Board } from "@/libs/types";

export function BoardModal({ closeModal }: ModalProps) {
  const { register, handleSubmit } = useForm<Board>({
    resolver: zodResolver(BoardSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/board", {
        method: "post",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <header className="flex gap-4 items-center py-2">
        <button onClick={closeModal}>
          <CloseIcon width={24} height={24} className="hover:fill-[#C11D5A]" />
        </button>
        <h1>Add Board</h1>
      </header>
      <form onSubmit={onSubmit}>
        <label className="block py-2 font-medium">
          Title
          <input
            type="text"
            {...register("name")}
            className="block w-full p-3 bg-slate-300 outline-none rounded-lg"
          />
        </label>
        <label className="block py-2 font-medium">
          Background
          <input
            type="url"
            {...register("background")}
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
