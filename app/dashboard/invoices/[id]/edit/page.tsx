import { fetchCustomerById, fetchCustomers, fetchInvoiceById } from '@/app/lib/data'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import Form from '@/app/ui/invoices/edit-form'
import { notFound } from 'next/navigation'

import type { Metadata, ResolvedMetadata } from 'next'

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvedMetadata
): Promise<Metadata> {
  const id = params.id

  const [customer] = await Promise.all([fetchCustomerById(id)])

  return {
    title: `Edit ${customer.name}`,
  }
}

// export async function generateMetadata({ params }) {
//   return {
//     title: '...',
//   }
// }

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])

  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}
