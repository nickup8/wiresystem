import DataTable from '@/components/data-table';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Machine, PaginationProps } from '@/types';
import { router } from '@inertiajs/react';
import { Settings } from 'lucide-react';

export default function MachinesTable({ machinesList }: { machinesList: PaginationProps<Machine[]> }) {
    const columns = [
        {
            accessorKey: 'name',
            header: 'Название машины',
            size: 200,
        },
        {
            accessorKey: 'zone',
            header: 'Зона',
            cell: ({ row }: { row: any }) => row.original.zone?.zone || 'Нет зоны',
            size: 200,
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            cell: ({ row }: { row: any }) =>
                new Date(row.original.created_at).toLocaleString('ru', { day: '2-digit', month: 'long', year: 'numeric' }),
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            cell: ({ row }: { row: any }) =>
                new Date(row.original.updated_at).toLocaleString('ru', { day: '2-digit', month: 'long', year: 'numeric' }),
        },
        {
            id: 'actions',
            cell: ({ row }: { row: any }) => (
                <Button variant={'ghost'} size="icon" onClick={() => router.get(route('machines.edit', row.original.id))}>
                    <Settings />
                </Button>
            ),
            size: 10,
        },
    ];

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full overflow-hidden rounded-xl border p-4">
            <div className="mb-4">
                <HeadingSmall title="Список созданых мест хранений" />
            </div>
            <DataTable columns={columns} data={machinesList.data} />
        </div>
    );
}
