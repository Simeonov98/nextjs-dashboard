'use client'
import { useState } from 'react'
import { CardsType } from './card'
import { Column } from './column'
import { BurnBarrel } from './burnBarrel'
import { column, users } from 'prisma/generated/prisma/client'

export default function BoardClient({ initialCards,user,columns }: { initialCards: CardsType[],user:users,columns:column[] }) {
    const [cards, setCards] = useState(initialCards)
    // setCards(initialCards)

    return (
        <div className="flex h-full w-full gap-3 overflow-scroll p-12">
            {columns.map(col =>(
                <Column key={col.id} colName={col.name} columnId={col.id} headingColor='text-indigo-500' cards={cards} setCards={setCards} user={user}/>
            ))}
            
            <BurnBarrel setCards={setCards} user={user}/>

            {/* <Column title={columns[0].name.toUpperCase()} column={columns[0].name} headingColor="text-neutral-600" cards={cards} setCards={setCards} user={user}/>
            <Column title="TODO" column="todo" headingColor="text-yellow-400" cards={cards} setCards={setCards} user={user}/>
            <Column title="In progress" column="in-progress" headingColor="text-blue-500" cards={cards} setCards={setCards} user={user}/>
            <Column title="Complete" column="done" headingColor="text-emerald-500" cards={cards} setCards={setCards} user={user}/>
            <BurnBarrel setCards={setCards} user={user}/> */}
        </div>
    );
}