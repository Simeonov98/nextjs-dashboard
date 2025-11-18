import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/app/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <-- await here

  if (!slug) {
    return <div>Invoice slug is missing</div>;
  }

const invoice = await prisma.invoices.findUnique({
  where: {
    slug: slug, 
  },
  include: {
    customer: true, // Include related customer data
  },
});
if (!invoice) {
  return <div>Invoice not found</div>;
}
return <div className='flex flex-row border rounded'>
    <div className='flex-col-1 items-start p-4'>
        <h2 className="text-xl font-semibold">Invoice:</h2>
        <p className='font-xl'>{invoice?.id}</p>
        <p className='font-gray-600'>Created At: {invoice?.date.toDateString()}</p>
        <p className='font-gray-600'>Amount: {formatCurrency(invoice?.amount)}</p>
        <p className='font-gray-600'>Status: {invoice?.status}</p>
    </div>
    <div className='flex-col-1 items-start p-4'>
        <h2 className="text-xl font-semibold">Customer:</h2>
        <p className='font-gray-600'>Name: {invoice?.customer.name}</p>
        <p className='font-gray-600'>Email: {invoice?.customer.email}</p>
    </div>
    
</div>;
}