'use client'
import { useState } from 'react'
import { Column } from './column'
import { BurnBarrel } from './burnBarrel'
import { column, users, tasks } from 'prisma/generated/prisma/client'

export default function BoardClient({ initialCards, user, columns }: { initialCards: tasks[], user: users, columns: column[] }) {
    const [cards, setCards] = useState(initialCards)

    return (
        <div className="flex h-full w-full gap-3  p-6">
            {columns.map(col => (
                <Column key={col.id} colName={col.name} columnId={col.id} headingColor='text-indigo-500' cards={cards} setCards={setCards} user={user} />
            ))}
            <BurnBarrel setCards={setCards} user={user} />
        </div>
    );
}