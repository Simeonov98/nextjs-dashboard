import { motion } from "framer-motion";
import { DropIndicator } from "./dropIndicator";

export type CardsType = {
  id: string;
  title: string;
  column: string;
}
export const Card=({ title, id, column,handleDragStart }: { title: string; id: string; column: string; handleDragStart:Function})=> {

  return (
    <>
    <DropIndicator beforeId={id} column={column}/>
    <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className={`cursor-grab rounded border border-neutral-400 bg-indigo-500 p-3 active:cursor-grabbing`}
      >
        <p className="text-sm text-white">{title}</p>
      </motion.div>
    </>
  );
}