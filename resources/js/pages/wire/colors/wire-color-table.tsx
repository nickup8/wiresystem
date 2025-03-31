import DataTable from '@/components/data-table';
import { WireColor } from '@/types';

export default function WireColorTable({ wireColors }: { wireColors: WireColor[] }) {
    const columns = [
        {
            accessorKey: 'barcode',
            header: 'Код цвета провода',
        },
        {
            accessorKey: 'name',
            header: 'Название цвета провода',
        },
    ];
    return <DataTable columns={columns} data={wireColors} />;
}
