import DataTable from '@/components/data-table';
import { WireType } from '@/types';

export default function WireTypesTable({ wireTypes }: { wireTypes: WireType[] }) {
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
    return <DataTable columns={columns} data={wireTypes} />;
}
