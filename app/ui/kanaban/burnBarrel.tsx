import { useState } from "react";
import { CardsType } from "./card";
import { deleteTask } from "@/app/lib/tasks";
import { FaFire } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";






export const BurnBarrel=({ setCards }: { setCards: Function }) => {
    const [active, setActive] = useState(false);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>)=> {
        e.preventDefault();
        setActive(true);
    }
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(false);
    }
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId");
        setCards((prevCards: CardsType[]) => prevCards.filter(card => card.id !== cardId));
        deleteTask(cardId);
        setActive(false);
    }
  return (
     <div onDrop={handleDragEnd}
     onDragOver={handleDragOver}
     onDragLeave={handleDragLeave}
     className={`mt-10 grid basis-1/5 shrink-0 place-content-center rounded border text-3xl ${
         active
           ? "border-red-800 bg-red-800/20 text-red-500"
           : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
       }`}>{active ? <FaFire className="animate-bounce"/> : <FiTrash2 />}

    </div>
   )
}