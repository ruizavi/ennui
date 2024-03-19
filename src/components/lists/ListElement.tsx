import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List } from "@prisma/client";
import { MoveIcon } from "../icons/MoveIcon";

export const ListElement = (props: List) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li style={style} className="w-[270px] bg-white bg-opacity-30 rounded-lg">
      <header className="flex justify-between bg-white bg-opacity-50 rounded-t-lg">
        <h1 className="text-center py-2 font-semibold w-full">{props.name}</h1>
        <button
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="group px-4"
        >
          <MoveIcon
            height={16}
            width={16}
            className="fill-[#C11D5A] group-hover:fill-[#CD4A7B]"
          />
        </button>
      </header>
    </li>
  );
};
