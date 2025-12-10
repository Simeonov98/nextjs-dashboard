'use client'
import { useState } from "react";
import { createTask } from "@/app/lib/tasks";
import { CardsType } from "./card";
import { keyframes, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { users } from 'prisma/generated/prisma/client';
import { title } from "process";



export const AddCard = ({ setCards, columnId, user, title, children }: { setCards: Function; columnId: number; user: users; title: string; children: users[]}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedExecutors,setSelectedExecutors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (!text.trim().length) return;

    // const createdTask = await createTask(column,text,user)
    const createdTask = await createTask(text, columnId, user,selectedExecutors)
    if (!createdTask) {

      console.error('createTask returned empty result')
      return;
    }
     
    // console.log("Bum!!! createTask DID NOT return empty result")

    // setCards((prevCards: CardsType[]) => [...prevCards, {
    //   id: createdTask?.id,
    //   title: text,
    //   columnId,
    //   owner_id:user.id

    // }]);
    setCards((prevCards: CardsType[]) => [...prevCards, createdTask]);
    setText("");
    setAdding(false);
  }
  const handleSelectedExecutors = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
      setSelectedExecutors(values);
    };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit} >
          <div className={`grid grid-cols-2 grid-rows-2`}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new Task..."
              className="row-span-2 w-full rounded border border-violet-400 bg-violet400/20 p-3 text-sm text-neutral-450 placeholder-violet-300 focus:outline-0"
            />
            <div className="pl-2">
              <select 
                multiple
                className="w-full rounded border p-2 text-sm bg-white"
                value={selectedExecutors}
                onChange={handleSelectedExecutors}
                >
                {children.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
              </select>
            </div>
          </div>
          
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-emerald-200"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-600"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};