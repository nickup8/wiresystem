import DataTable, { DataTableProps } from '@/components/data-table';
import HeadingSmall from '@/components/heading-small';

export default function ZoneTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full overflow-hidden rounded-xl border p-4">
            <div className="mb-4">
                <HeadingSmall title="Список зон" description="Ниже представлен список зон" />
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
