import Image from "next/image";
import AddCircle from "../../assets/add.svg";

export function AddBoardButton() {
  return (
    <button className="hover:shadow-md border rounded-md p-2">
      <Image src={AddCircle} alt="Add Board..." width={16} height={16} />
    </button>
  );
}
