import DataTable from '@/components/data-table';
import { WireSize } from '@/types';

export default function WireSizeTable({ wireSizes }: { wireSizes: WireSize[] }) {
    const columns = [
        {
            accessorKey: 'barcode',
            header: 'Код сечения провода',
        },
        {
            accessorKey: 'name',
            header: 'Название сечения провода',
        },
    ];
    return <DataTable columns={columns} data={wireSizes} />;
}
