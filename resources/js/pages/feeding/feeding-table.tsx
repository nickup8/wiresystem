import DataTable from '@/components/data-table';

export default function FeedingTable() {
    const columns = [
        {
            accessorKey: 'zone',
            header: 'Зона',
        },
        {
            accessorKey: 'zone.zone',
            header: 'Место хранение',
        },
        {
            accessorKey: 'material',
            header: 'YPN',
        },
        {
            accessorKey: 'barcode',
            header: 'Штриход',
        },
        {
            accessorKey: 'description',
            header: 'Описание',
        },
        {
            accessprKey: 'created_at',
            header: 'Создан',
        },
    ];
    return <DataTable columns={columns} data={[]} />;
}
