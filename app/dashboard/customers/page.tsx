import { createInvoice } from '@/app/lib/action';
import { prisma } from '@/app/lib/prisma';
import { Metadata } from 'next';
import { formatCurrency } from '@/app/lib/utils';
import Link from 'next/link';
import { Invoice } from '@/app/lib/definitions';


export const metadata: Metadata = {
  title: 'Customers'
}
export default async function Page() {
  const customers = await prisma.customers.findMany({
    include: {
      invoices: true,
    },
  });
  // const invoices = await prisma.invoices.findMany({
  //   include: {
  //     customer: true,  // relation name, not the FK column
  //   },
  // });

  return <div>

    <h1 className="text-2xl font-bold mb-4">Customers</h1>
    <ul>
      {customers.map((customer: typeof customers[number]) => (
        
          <div key={customer.id} className='grid grid-cols-2 gap-4 items-start p-4 border rounded'>
            <div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <p className="text-gray-600">{customer.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Invoices:</h3>
              {customer.invoices.length === 0 ? (
                <p className='text-gray-600'>No invoices</p>
              ) : (
                <div className='flex flex-wrap gap-2'>
                  {customer.invoices.map((invoice) => ( 
                    <Link
                      key={invoice.id}
                      href={`/dashboard/invoices/${invoice.slug }`}
                      className='text-gray-600 hover:underline'
                    >
                      {`${invoice.status} : ${formatCurrency(invoice.amount)}`}
                    </Link>
                  )) }
                </div>
              )}
            </div>
          </div>
        
      ))}
    </ul>
  </div>;

}