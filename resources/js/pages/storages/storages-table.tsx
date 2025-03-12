import DataTable from '@/components/data-table';
import HeadingSmall from '@/components/heading-small';
import { PaginationProps, StoragesList } from '@/types';

import { ColumnDef } from '@tanstack/react-table';

export default function StoragesTable({ storagesList }: { storagesList: PaginationProps<StoragesList> }) {
    const columns: ColumnDef<StoragesList>[] = [
        {
            accessorKey: 'rack',
            header: 'Название стеллажа',
        },
        {
            accessorKey: 'zone',
            header: 'Название зоны',
            cell: ({ row }) => row.original.zone.zone,
        },
        {
            accessorKey: 'start_level',
            header: 'Начальный уровень',
        },
        {
            accessorKey: 'level_count',
            header: 'Количество уровней',
        },
        {
            accessorKey: 'start_storage',
            header: 'Начальное место хранения',
        },
        {
            accessorKey: 'finish_storage',
            header: 'Конечное место хранения',
        },
    ];

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full overflow-hidden rounded-xl border p-4">
            <div className="mb-4">
                <HeadingSmall title="Список созданых мест хранений" />
            </div>
            <DataTable columns={columns} data={storagesList.data} />
        </div>
    );
}
