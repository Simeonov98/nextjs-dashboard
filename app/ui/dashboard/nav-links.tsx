'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  TableCellsIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { users } from 'prisma/generated/prisma/client'
import { userAgent } from 'next/server';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon, },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Kanban', href: '/dashboard/kanban', icon: TableCellsIcon },
  { name: 'Add User', href: '/dashboard/adduser', icon: UserPlusIcon,requiresLevel:3 }
];

export default function NavLinks({user}:{user:(users&{role:{level:number}})}) {
  const pathname = usePathname();
  const visibleLinks = links.filter((link)=>{
    if (link.requiresLevel===undefined) return true;
    return user.role.level !== undefined && user.role.level < link.requiresLevel
  })
  return (
    <>
      {visibleLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}

          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
