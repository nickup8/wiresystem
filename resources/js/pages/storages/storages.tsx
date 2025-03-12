import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginationProps, StoragesList, Zone } from '@/types';
import { Head } from '@inertiajs/react';
import { ShieldX } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import StoragesCreate from './storages-create';
import StoragesTable from './storages-table';

export default function Storages({ zones, storagesList, error }: { zones: Zone[]; storagesList: PaginationProps<StoragesList>; error: string }) {
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
            title: 'Места хранения фидинга',
            href: '/zones',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Места хранения фидинга" />
            <div className="mx-4 mt-4 mb-6">
                <Heading title="Места хранения фидинга" description="Добавляйте и удаляйте места хранения по зонам" />
            </div>
            <div className="mx-4 flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-[350px]">
                        <StoragesCreate zones={zones} />
                    </div>
                    <div className="flex-1">
                        <div>
                            <StoragesTable storagesList={storagesList} />
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
