import DataTable from '@/components/data-table';
import HeadingSmall from '@/components/heading-small';

export default function FeedingTable() {
    const columns = [
        {
            accessorKey: 'zone',
            header: 'Зона',
        },
        {
            accessorKey: 'material',
            header: 'YPN',
        },
        {
            accessorKey: 'storage',
            header: 'Ячейка',
        },
        {
            accessorKey: 'machine',
            header: 'Машина',
        },
    ];
    return (
        <div className="flex flex-col gap-2">
            <HeadingSmall title="Список заказанных проводов" />
            <DataTable columns={columns} data={[]} />
        </div>
    );
}
