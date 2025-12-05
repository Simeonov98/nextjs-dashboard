'use client'
import { useState } from "react";
import { createTask } from "@/app/lib/tasks";
import { CardsType } from "./card";
import { keyframes, motion } from "framer-motion";  
import { FiPlus } from "react-icons/fi";
import { users } from 'prisma/generated/prisma/client';
import { title } from "process";



export const AddCard =({setCards, columnId, user,title}:{setCards:Function; columnId:number; user:users; title:string})=> {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
   
      e.preventDefault()
        
        if(!text.trim().length) return;
        
        // const createdTask = await createTask(column,text,user)
        const createdTask = await createTask(text,columnId,user)
        if (!createdTask) {
          
          console.error('createTask returned empty result')
          return;
        }

        console.log("Bum!!! createTask DID NOT return empty result")
        
        setCards((prevCards: CardsType[]) => [...prevCards, {
          id: createdTask?.id,
          title: text,
          columnId,
          owner_id:user.id

        }]);

        setText(text);
        setAdding(false);
    }
 
    
    return(
        <>
        {adding ? (
            <motion.form layout onSubmit={handleSubmit} >
                <textarea
                onChange={(e) => setText(e.target.value)}
                autoFocus
                placeholder="Add new Task..."
                className="w-full rounded border border-violet-400 bg-violet400/20 p-3 text-sm text-neutral-450 placeholder-violet-300 focus:outline-0"
                />  
                <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
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
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};