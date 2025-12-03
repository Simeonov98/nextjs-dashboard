import { useState } from "react";
import { createTask } from "@/app/lib/tasks";
import { CardsType } from "./card";
import { motion } from "framer-motion";  
import { FiPlus } from "react-icons/fi";



export const AddCard =({setCards, column}:{setCards:Function,column:string})=> {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
   
      e.preventDefault()
        
        if(!text.trim().length) return;
        
        const createdTask = await createTask(column,text)
        if(!createdTask) return;
        
        setCards((prevCards: CardsType[]) => [...prevCards, {
          id: createdTask?.id,
          title: text,
          column

        }]);
        
        setText("");
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