import { motion } from "framer-motion";
import { DropIndicator } from "./dropIndicator";

export type CardsType = {
  id: string;
  title: string;
  columnId: number;
  owner_id: string;
}
export const Card=({ title, id, columnId, handleDragStart }: { title: string; id: string; columnId: number; handleDragStart:Function})=> {

  return (
    <>
    <DropIndicator beforeId={id} columnId={columnId}/>
    <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, columnId })}
        className={`cursor-grab rounded border border-neutral-400 bg-indigo-500 p-3 active:cursor-grabbing`}
      >
        <p className="text-sm text-white">{title}</p>
      </motion.div>
    </>
  );
}