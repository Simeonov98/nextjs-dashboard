

import React, { useState,useEffect, ReactEventHandler, use } from "react";
import { prisma } from "@/lib/prisma";
import { fetchAllTasks } from "@/app/lib/data";
import { FaFire } from "react-icons/fa";
import { FiTrash2,FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { createTask,deleteTask,updateTask } from "@/app/lib/tasks";
import { CardsType } from "./card";
import { Column } from "./column";
import { BurnBarrel } from "./burnBarrel";

// export type CardsType = {
//   id: string;
//   title: string;
//   column: string;
// }
export const Board = () => {
// export function Board() {
  const [cards, setCards] = useState<CardsType[]>([]);
    useEffect(() => {
        async function loadTasks() {
            const tasks = await fetchAllTasks();
            setCards(tasks);
        }
        loadTasks();
    }, []);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column title="Backlog" column="backlog" headingColor="text-neutral-600" cards={cards} setCards={setCards} />
      <Column title="TODO" column="todo" headingColor="text-yellow-400" cards={cards} setCards={setCards}/>
      <Column title="In progress" column="doing" headingColor="text-blue-500" cards={cards} setCards={setCards}/>
      <Column title="Complete" column="done" headingColor="text-emerald-500" cards={cards} setCards={setCards}/>
      <BurnBarrel setCards={setCards}/>
    </div>
  );
}
// export const Column = ({ title, headingColor, column, cards, setCards }: { title: string; headingColor: string; column: string; cards: CardsType[]; setCards: Function }) =>{
//   const [active, setActive] = useState(false);
//   const filteredCards = cards.filter((card) => card.column === column);
  
//   const handleDragStart = (e: React.DragEvent<HTMLDivElement>,card:CardsType) => {
//     e.dataTransfer.setData("cardId", card.id);
//   }
//   const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
//     const cardId = e.dataTransfer.getData("cardId");
//     setActive(false);
//     clearHighlights();

//     const indicators = getIndicators();
//     const {element} = getNearestIndicator(e, indicators);

//     const before = element.dataset.before || '-1';

//     if (before !==cardId){
//       let copy = [...cards];
//       let cardToTransfer = copy.find(c => c.id === cardId);
//       if(!cardToTransfer) return;
//       cardToTransfer = {...cardToTransfer, column};
//       copy = copy.filter(c => c.id !== cardId);
//       const moveToBack = before === '-1';
//       if (moveToBack) {
//         copy.push(cardToTransfer);
//       } else {
//         const insertAtIndex = copy.findIndex((el) => el.id === before);
//         if (insertAtIndex === undefined) return;
//         copy.splice(insertAtIndex, 0, cardToTransfer);
//       }
//       setCards(copy);
//       updateTask(column, cardToTransfer.title, cardToTransfer.id);
//     }
//   }
//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     highlightIndicator(e);
//     setActive(true);
//   }
//   const clearHighlights = (els?:HTMLElement[]) => {
//     const indicators = els||getIndicators();
//     indicators.forEach((i)=>{
//       i.style.opacity = '0'
//     })
//   };
//   const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
//     const indicators = getIndicators()
//     clearHighlights(indicators);
//     const el =  getNearestIndicator(e, indicators);
//     el.element.style.opacity = '1';

//   };
//   const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators:HTMLElement[]) => {
//     const DISTANCE_OFFSET = 50;

//     const el = indicators.reduce(
//       (closest, child) => {
//         const box = child.getBoundingClientRect();

//         const offset = e.clientY - (box.top + DISTANCE_OFFSET);

//         if (offset < 0 && offset > closest.offset) {
//           return { offset: offset, element: child };
//         } else {
//           return closest;
//         }
//       },
//       {
//         offset: Number.NEGATIVE_INFINITY,
//         element: indicators[indicators.length - 1],
//       }
//     );

//     return el;
//   };
//   const getIndicators = ():HTMLElement[] => {
//     return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
//   };
//   const handleDragLeave = () => {
//     const indicators = getIndicators();
//     clearHighlights(indicators);
//     setActive(false);
//   };

//   return (
//   <div className="basis-1/5">
//     <div className="mb-3 flex items-center justify-between">
//       <h3 className={`font-medium ${headingColor}`}>{title}</h3>
//         <span className="rounded text-sm text-neutral-400">
//           {filteredCards.length}
//         </span>
//     </div>
//     <div 
//       onDrop={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       className={`h-full w-full transition-colors 
//         ${active ? "bg-neutral-300/50" : "bg-neutral-300/0"}`}
//       >
//         {filteredCards.map((c: any) => {
//           return <Card key={c.id} {...c} handleDragStart={handleDragStart} headingColor={headingColor} />
//         })}
//       <DropIndicator beforeId='-1' column={column} />
//       <AddCard setCards={setCards} column={column}/>
//     </div>
//   </div>
//   )

// };
// const Card=({ title, id, column,handleDragStart }: { title: string; id: string; column: string; handleDragStart:Function})=> {

//   return (
//     <>
//     <DropIndicator beforeId={id} column={column}/>
//     <motion.div
//         layout
//         layoutId={id}
//         draggable="true"
//         onDragStart={(e) => handleDragStart(e, { title, id, column })}
//         className={`cursor-grab rounded border border-neutral-400 bg-indigo-500 p-3 active:cursor-grabbing`}
//       >
//         <p className="text-sm text-white">{title}</p>
//       </motion.div>
//     </>
//   );
// }
// const AddCard =({setCards, column}:{setCards:Function,column:string})=> {
//     const [text, setText] = useState("");
//     const [adding, setAdding] = useState(false);
    
//     const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
   
//       e.preventDefault()
        
//         if(!text.trim().length) return;
        
//         const createdTask = await createTask(column,text)
//         if(!createdTask) return;
        
//         setCards((prevCards: CardsType[]) => [...prevCards, {
//           id: createdTask?.id,
//           title: text,
//           column

//         }]);
        
//         setText("");
//         setAdding(false);
//     }
 
    
//     return(
//         <>
//         {adding ? (
//             <motion.form layout onSubmit={handleSubmit} >
//                 <textarea
//                 onChange={(e) => setText(e.target.value)}
//                 autoFocus
//                 placeholder="Add new Task..."
//                 className="w-full rounded border border-violet-400 bg-violet400/20 p-3 text-sm text-neutral-450 placeholder-violet-300 focus:outline-0"
//                 />  
//                 <div className="mt-1.5 flex items-center justify-end gap-1.5">
//             <button
//               onClick={() => setAdding(false)}
//               className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
//             >
//               <span>Add</span>
//               <FiPlus />
//             </button>
//           </div>
//         </motion.form>
//       ) : (
//         <motion.button
//           layout
//           onClick={() => setAdding(true)}
//           className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
//         >
//           <span>Add card</span>
//           <FiPlus />
//         </motion.button>
//       )}
//     </>
//   );
// };


// const BurnBarrel=({ setCards }: { setCards: Function }) => {
//     const [active, setActive] = useState(false);
//     const handleDragOver = (e: React.DragEvent<HTMLDivElement>)=> {
//         e.preventDefault();
//         setActive(true);
//     }
//     const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         setActive(false);
//     }
//     const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
//         const cardId = e.dataTransfer.getData("cardId");
//         setCards((prevCards: CardsType[]) => prevCards.filter(card => card.id !== cardId));
//         deleteTask(cardId);
//         setActive(false);
//     }
//   return (
//      <div onDrop={handleDragEnd}
//      onDragOver={handleDragOver}
//      onDragLeave={handleDragLeave}
//      className={`mt-10 grid basis-1/5 shrink-0 place-content-center rounded border text-3xl ${
//          active
//            ? "border-red-800 bg-red-800/20 text-red-500"
//            : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
//        }`}>{active ? <FaFire className="animate-bounce"/> : <FiTrash2 />}

//     </div>
//    )
// }