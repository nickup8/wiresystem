import DataTable from '@/components/data-table';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Settings } from 'lucide-react';

export default function TableMachine() {
    const columns = [
        {
            accessorKey: 'name',
            header: 'YPN провода',
        },
        {
            id: 'action',
            cell: ({ row }: { row: any }) => (
                <Button variant={'ghost'} size="icon" onClick={() => router.get(route('machines.edit', row.original.id))}>
                    <Settings />
                </Button>
            ),
            size: 50,
        },
    ];
    return (
        <>
            <HeadingSmall title="Список заказанных проводов" />
            <div className="w-full">
                <DataTable columns={columns} data={[]} />
            </div>
        </>
    );
}
