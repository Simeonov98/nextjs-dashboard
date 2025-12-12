'use client'
import { useState } from "react";
import { createTask } from "@/app/lib/tasks";
import { CardsType } from "./card";
import { keyframes, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { users } from 'prisma/generated/prisma/client';



export const AddCard = ({ setCards, columnId, user, title, children }: { setCards: Function; columnId: number; user: users; title: string; children: users[] }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedExecutors, setSelectedExecutors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (!text.trim().length) return;

    // const createdTask = await createTask(column,text,user)
    const createdTask = await createTask(text, columnId, user, selectedExecutors)
    if (!createdTask) {

      console.error('createTask returned empty result')
      return;
    }


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
  

  const MultiSelect = ({ options, selectedOptions, setSelectedOptions, placeholder }: { options: string[]; selectedOptions: string[]; setSelectedOptions: (opts: string[]) => void; placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o: string) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative w-full">
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm text-left flex justify-between items-center focus:outline-none"
      >
        <span>
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
        </span>
        <span className="ml-2">▼</span>
      </button>

      {/* Dropdown list */}
      {isOpen && (
        // <ul className="relative w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
        <ul className="w-full p-2 rounded border text-sm bg-white">
          {options.map((option: string) => (
            <li
              key={option}
              className="flex items-centerhover:bg-gray-100 cursor-pointer"
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
                className="mr-2"
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit} >
          <div className='wrapper'>
            {children.length ? (
              <div className="grid grid-cols-2 grid-rows-2">
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  autoFocus
                  placeholder="Add new Task..."
                  className="row-span-2 w-full rounded border border-violet-400 bg-violet400/20 p-3 text-sm text-neutral-450 placeholder-violet-300 focus:outline-0"
                />
                <div className="pl-2">
                  {/* <select
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
                  </select> */}
                  <MultiSelect
                    options={children.map((ex) => (ex.name))}
                    selectedOptions={selectedExecutors}
                    setSelectedOptions={setSelectedExecutors}
                    placeholder='Select'
                  />
                </div>
              </div>
            ) : (
              <textarea
                onChange={(e) => setText(e.target.value)}
                autoFocus
                placeholder="Add new Task..."
                className="row-span-2 w-full rounded border border-violet-400 bg-violet400/20 p-3 text-sm text-neutral-450 placeholder-violet-300 focus:outline-0"
              />
            )}
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
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-600"
        >
          <span>Add card</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};