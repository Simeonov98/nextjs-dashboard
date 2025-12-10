import { useState } from 'react'
import { updateTask } from '@/app/lib/tasks';
import { DropIndicator } from './dropIndicator';
import { CardsType } from './card';
import { Card } from './card';
import { AddCard } from './addCard';
import { users,tasks } from 'prisma/generated/prisma/client';
import { TaskWithOwner } from './kanbanTypes'
// Task with included relations returned by fetchAllTasks


export const Column = ({
  colName,
  columnId,
  headingColor,
  cards,
  setCards,
  user,
  children }: {
    colName: string;    
    columnId: number;
      headingColor: string;
      cards: TaskWithOwner[];
    setCards: Function;
    user: users;
    children: users[]
  }) => {
  const [active, setActive] = useState(false);

  //title==column.name 
  const filteredCards = cards.filter((card) => card.columnId === columnId);
  //console.log(`Filtered Cards for ${cards.forEach((card)=>card.column)} columnId===> ${columnId}: ${JSON.stringify(filteredCards, null, 4)}`);
  // console.log('Filtered Cards:', JSON.stringify(filteredCards, null, 4));
  // console.log('Unfiltered Cards:', JSON.stringify(cards, null, 4));
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: CardsType) => {
    e.dataTransfer.setData("cardId", card.id);
  }
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || '-1';

    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find(c => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, columnId: columnId };
      copy = copy.filter(c => c.id !== cardId);
      const moveToBack = before === '-1';
      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
      // updateTask(column, cardToTransfer.title, cardToTransfer.id);
      updateTask(cardToTransfer.id,columnId,cardToTransfer.title)
    }
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  }
  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = '0'
    })
  };
  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators()
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = '1';

  };
  const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };
  const getIndicators = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${columnId}"]`)) as HTMLElement[];
  };
  const handleDragLeave = () => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    setActive(false);
  };

  return (
    <div className="basis-1/5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{colName}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors 
        ${active ? "bg-neutral-300/50" : "bg-neutral-300/0"}`}
      >
        {filteredCards.map((c: TaskWithOwner,i) => {
          const shade = i % 2 === 0 ? `bg-indigo-400` : `bg-violet-400`
          // prefer the owner's name if the relation was included, otherwise fall back to owner_id
          const ownerName = c.owner?.name ?? c.owner_id;

          return <Card bgColor={shade} key={c.id} title={c.title} id={c.id} columnId={c.columnId} owner={ownerName} executors={c.executors}handleDragStart={handleDragStart} />
        })}
        <DropIndicator beforeId='-1' columnId={columnId} />
        <AddCard setCards={setCards} columnId={columnId} title={colName} user={user} children={children}/>
      </div>
    </div>
  )

};