import DataTable from '@/components/data-table';
import { PaginationProps, WireStorage } from '@/types';

export default function FeedingTable({ wires }: { wires: PaginationProps<WireStorage> }) {
    const columns = [
        {
            accessorKey: 'storage.zone.zone',
            header: 'Зона',
        },
        {
            accessorKey: 'storage.name',
            header: 'Место хранение',
        },
        {
            accessorKey: 'wire.material',
            header: 'YPN',
        },
        {
            accessorKey: 'wire.barcode',
            header: 'Штриход',
        },
        {
            header: 'Описание',
            cell: ({ row }: { row: any }) => {
                const details = row.original.wire.details;
                return `${details.type.name} ${details.size.name} ${details.color.name}`;
            },
        },
    ];
    return <DataTable columns={columns} data={wires.data} />;
}
