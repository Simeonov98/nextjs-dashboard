'use client'
import { useState } from "react";
import { createTask } from "@/app/lib/tasks";
import { CardsType } from "./card";
import { keyframes, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { users } from 'prisma/generated/prisma/client';
import { string } from "zod";



export const AddCard = ({ setCards, columnId, user, title, children }: { setCards: Function; columnId: number; user: users; title: string; children: users[] }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedExecutors, setSelectedExecutors] = useState<string[]>([])
  // children.forEach(element => {
  //   console.log('The children are name: ', element.name, ' id: ', element.id);
  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (!text.trim().length) return;

    // const createdTask = await createTask(column,text,user)
    console.log(selectedExecutors)
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

  type Option = { label: string, value: string }
  const MultiSelect = ({ options, selectedValues, setSelectedValues, placeholder }: { options: Option[]; selectedValues: string[]; setSelectedValues: (values: string[]) => void; placeholder: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option: string) => {
      if (selectedValues.includes(option)) {
        setSelectedValues(selectedValues.filter((o: string) => o !== option));
      } else {
        setSelectedValues([...selectedValues, option]);
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
            {/* {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder} */}
            {selectedValues.length
              ? options
                .filter((o) => selectedValues.includes(o.value))
                .map((o) => o.label)
                .join(',') : placeholder}
          </span>
          <span className="ml-2">▼</span>
        </button>

        {/* Dropdown list */}
        {isOpen && (
          // <ul className="relative w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="w-full p-2 rounded border text-sm bg-white">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-centerhover:bg-gray-100 cursor-pointer"
                onClick={() => toggleOption(option.value)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  readOnly
                  className="mr-2"
                />
                {option.label}
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
                  <MultiSelect
                    options={children.map((u) => ({
                      label: u.name,
                      value: u.id,
                    }))}
                    selectedValues={selectedExecutors}
                    setSelectedValues={setSelectedExecutors}
                    placeholder="Select executors"
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