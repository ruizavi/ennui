"use client";

import { Controller, useForm } from "react-hook-form";
import { CloseIcon } from "../icons/CloseIcon";
import { ModalProps } from "../utils/modal/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListSchema } from "@/libs/zod";
import { ZList } from "@/libs/types";
import { CirclePicker, TwitterPicker } from "react-color";

export function ListModal({
  closeModal,
  boardId,
}: ModalProps<{ boardId: string }>) {
  const { register, handleSubmit, control } = useForm<ZList>({
    resolver: zodResolver(ListSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/board/${boardId}/list`,
        {
          method: "post",
          body: JSON.stringify({ ...data, boardId }),
        }
      );

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
        <h1>Add List</h1>
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
          Color
          <Controller
            name="color"
            control={control}
            render={({ field: { onChange } }) => (
              <CirclePicker
                className="my-3"
                onChangeComplete={(v) => onChange(v.hex)}
              />
            )}
          />
        </label>
        <button
          type="submit"
          className="bg-[#B78F77] bg-opacity-80 hover:bg-opacity-70 font-semibold p-2 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-rounded-tr-sm"
        >
          Save List
        </button>
      </form>
    </div>
  );
}
