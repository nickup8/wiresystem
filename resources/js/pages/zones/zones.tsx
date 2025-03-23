import Heading from '@/components/heading';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ShieldCheck, ShieldX, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import ZoneCreate from './zone-create';
import ZoneTable from './zone-table';

type Zone = {
    id: number;
    zone: string;
    created_at: Date;
};
export default function Zones({ zones, error, success }: { zones: Zone[]; error: string; success: string }) {
    const [isSending, setIsSending] = useState(false);

    if (success) {
        toast.success(success, {
            action: {
                label: 'Закрыть',
                onClick: () => {
                    success = '';
                },
            },
            icon: <ShieldCheck />,
            style: {
                border: '1px solid green',
                padding: '16px',
                color: 'green',
            },
        });
    }

    if (error) {
        toast.error(error, {
            action: {
                label: 'Закрыть',
                onClick: () => {
                    error = '';
                },
            },
            icon: <ShieldX />,
            style: {
                border: '1px solid red',
                padding: '16px',
                color: 'red',
            },
        });
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Зоны фидинга',
            href: '/zones',
        },
    ];

    const handleDelete = (id: number) => {
        setIsSending(true);
        router.delete(route('zones.destroy', id), {
            onSuccess: () => {
                setIsSending(false);
                router.reload({ only: ['zones'] });
            },
            onError: () => {
                setIsSending(false);
            },
        });
    };

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
                return <span>{new Date(date).toLocaleString('ru', { day: '2-digit', month: 'long', year: 'numeric' })}</span>;
            },
        },
        {
            id: 'actions',
            size: 10,
            cell: ({ row }) => {
                const zone = row.original;
                return (
                    // <DropdownMenu>
                    //     <DropdownMenuTrigger asChild>
                    //         <Button variant={'ghost'} className="h-8 w-8 p-0">
                    //             <span className="sr-only">Открыть меню</span>
                    //             <MoreVertical className="h-4 w-4" />
                    //         </Button>
                    //     </DropdownMenuTrigger>
                    //     <DropdownMenuContent align="end">
                    //         <DropdownMenuItem>
                    //             <Trash2 className="mr-2 h-4 w-4" />
                    //             <span>Удалить</span>
                    //         </DropdownMenuItem>
                    //     </DropdownMenuContent>
                    // </DropdownMenu>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={'outline'} size={'icon'}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Вы уверены, что хотите удалить <span className="font-bold text-red-500">"{zone.zone}"</span> ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>Это приведет к удалению всех мест хранения в зоне</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Отменить</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500" disabled={isSending} onClick={() => handleDelete(zone.id)}>
                                    Удалить
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                    <div className="h-full flex-1">
                        <ZoneTable columns={columns} data={zones} />
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
