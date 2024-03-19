import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoveIcon } from "../icons/MoveIcon";
import { UIList } from "@/libs/types";

export const ListElement = (props: UIList) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      style={style}
      className={`w-[270px] ${
        props.metadata?.color ? `bg-[${props.metadata.color}]` : "bg-white"
      } bg-opacity-30 rounded-lg`}
    >
      <header
        className={`flex justify-between ${
          props.metadata?.color ? `bg-[${props.metadata.color}]` : "bg-white"
        } bg-opacity-50 rounded-t-lg`}
      >
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
