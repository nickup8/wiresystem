import DataTable from '@/components/data-table';

export default function WireTypesTable() {
    const columns = [
        {
            accessorKey: 'barcode',
            header: 'Код типа провода',
        },
        {
            accessorKey: 'name',
            header: 'Название типа провода',
        },
    ];
    return <DataTable columns={columns} data={[]} />;
}
