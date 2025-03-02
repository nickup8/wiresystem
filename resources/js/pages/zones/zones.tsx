import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical, Trash2 } from 'lucide-react';
import ZoneCreate from './zone-create';
import ZoneTable from './zone-table';

type Zone = {
    id: number;
    zone: string;
    created_at: Date;
};
export default function Zones() {
    const data: Zone[] = [
        {
            id: 1,
            zone: 'Зона 1',
            created_at: new Date(),
        },
        {
            id: 2,
            zone: 'Зона 2',
            created_at: new Date(),
        },
        {
            id: 3,
            zone: 'Зона 3',
            created_at: new Date(),
        },
    ];
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Зоны фидинга',
            href: '/zones',
        },
    ];

    const columns: ColumnDef<Zone>[] = [
        {
            accessorKey: 'zone',
            header: 'Номер зоны',
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            cell: ({ row }) => {
                const date = row.original.created_at;
                return <span>{date.toLocaleDateString('ru-RU')}</span>;
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const zone = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant={'ghost'} className="h-8 w-8 p-0">
                                <span className="sr-only">Открыть меню</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Удалить</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Зоны фидинга" />
            <div className="mx-4 mt-4 mb-6">
                <Heading title="Зоны фидинга" description="Управляйте зонами фидинга" />
            </div>
            <div className="mx-4 flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-[350px]">
                        <ZoneCreate />
                    </div>
                    <div className="flex-1">
                        <ZoneTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
