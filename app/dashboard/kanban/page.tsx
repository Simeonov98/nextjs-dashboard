"use client"
// import { Card } from "@/app/ui/dashboard/cards";
import { useState } from "react";

import { prisma } from "@/lib/prisma";
import { fetchAllTasks } from "@/app/lib/data";
import { Board } from "@/app/ui/kanaban/board";




export default function KanbanPage() {
  return (
    <div className="h-screen w-full bg-neutral-800 text-neutral-500 border rounded-xl">
      <Board />
    </div>
  );
}
// const Board = async() => {
//   const tasks = await fetchAllTasks();
//   const [cards, setCards] = useState(tasks);

//   return (
//     <div className="flex h-full w-full gap-3 overflow-scroll p-12">
//       <Column title="Backlog" column="backlog" headingColor="text-neutral-500" cards={cards} setCards={setCards} />
//       <Column title="TODO" column="todo" headingColor="text-yellow-200" cards={cards} setCards={setCards}/>
//       <Column title="In progress" column="doing" headingColor="text-blue-200" cards={cards} setCards={setCards}/>
//       <Column title="Complete" column="done" headingColor="text-emerald-200" cards={cards} setCards={setCards}/>
//       <BurnBarrel setCards={setCards}/>
//     </div>
//     );
// }
// const Column = ({ title, headingColor, column, cards, setCards }) => {
//   const [active, setActive] = useState(false);
//   const filteredCards = cards.filter((card) => card.column === column);

//   return <div className="w-56 shrink-0">
//     <div className="mb-3 flex items-center justify-between">
//       <h3 className={`font-medium ${headingColor}`}>{title}</h3>
//       <span className="rounded text-sm text-neutral-400">{filteredCards.length}</span>
//     </div>
//     <div className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
//     {filteredCards.map((c: any) => {
//       return <Card key={c.id} {...c} />
//     })}
//     <DropIndicator beforeId='-1' column={column} />
//   </div>;
//   </div>

// }
// const Card = ({ title, id, column }) => {
//   return (
//     <>
//     <DropIndicator beforeId={id} column={column}/>
//     <div draggable='true' className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
//       <p className="text-sm text-neutral-100">
//         {title}
//       </p>
//     </div>
//     </>
//   );
// }
// const DropIndicator = ({ beforeId, column }) => {
//   return (
//     <div data-before={beforeId || "-1"} data-column={column} className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"/>
//   );
// }
// const BurnBarrel = ({ setCards }) => {
//   const [active, setActive] = useState(false);
//   return (
//     <div className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
//         active
//           ? "border-red-800 bg-red-800/20 text-red-500"
//           : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
//       }`}>{active ? <FaFire className="animate-bounce"/> : <FiTrash2 />}

//     </div>
//   )
// }
// const DEFAULT_CARDS = [
//   // BACKLOG
//   { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
//   { title: "SOX compliance checklist", id: "2", column: "backlog" },
//   { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
//   { title: "Document Notifications service", id: "4", column: "backlog" },
//   // TODO
//   { title: "Research DB options for new microservice", id: "5", column: "todo"},
//   { title: "Postmortem for outage", id: "6", column: "todo" },
//   { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

//   // DOING
//   { title: "Refactor context providers to use Zustand", id: "8", column: "doing" },
//   { title: "Add logging to daily CRON", id: "9", column: "doing" },
//   // DONE
//   { title: "Set up DD dashboards for Lambda listener",
//     id: "10",
//     column: "done"},
//   { title: "Fix broken tests in payments service", id: "11", column: "done" },
//   { title: "Upgrade Next.js to latest version", id: "12", column: "done" },
// ];