import { motion } from "framer-motion";
import { DropIndicator } from "./dropIndicator";
import { TaskWithOwner } from "./kanbanTypes"
import { users } from "prisma/generated/prisma/client"

export type CardsType = {
  id: string;
  title: string;
  columnId: number;
  owner_id: string;
  // when owner relation is included, it may be present as an object
  owner?: { name?: string } | null;
}
export const Card = ({ bgColor,title, id, columnId, owner, executors, handleDragStart }:
  { bgColor: string, title: string; id: string; columnId: number; owner?: string | null; executors?: users[] | null, handleDragStart: Function }) => {

  return (
    <>
      <DropIndicator beforeId={id} columnId={columnId} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, columnId })}
        className={`cursor-grab rounded border border-neutral-400 ${bgColor} p-3 active:cursor-grabbing`} // bg-indigo-500 put color here
      >
        <div className={`grid grid-cols-2 grid-rows-2`}>
          <div className={`row-span-2 border-r border-neutral-400 p-2 items-center break-words whitespace-normal`}>
            <p className="text-sm text-white">{title}</p>
          </div>
          <div className={`pl-2`}>
            <p className="text-sm text-white">Owner: {owner ?? ''}</p>
          </div>
          <div className={`pl-2`}>
            <p className="text-sm text-white"> Executors:</p>
            {executors?.map((executor: users) =>
              <p key={executor.id} className="text-sm text-white">{executor.name}</p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}