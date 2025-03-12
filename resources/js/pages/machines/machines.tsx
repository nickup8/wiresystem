import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Machine, PaginationProps, Zone } from '@/types';
import { Head } from '@inertiajs/react';
import { ShieldCheck, ShieldX } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import MachineCreate from './machine-create';
import MachinesTable from './machines-table';

export default function Machines({
    zones,
    error,
    success,
    machines,
}: {
    zones: Zone[];
    error: string;
    success: string;
    machines: PaginationProps<Machine[]>;
}) {
    const bradcrumbs: BreadcrumbItem[] = [
        {
            title: 'Оборудование',
            href: '/machines',
        },
    ];

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

    return (
        <AppLayout breadcrumbs={bradcrumbs}>
            <Head title="Оборудование" />
            <div className="mx-4 mt-4 mb-6">
                <Heading title="Оборудование" description="Добавляйте и удаляйте места хранения по зонам" />
            </div>
            <div className="mx-4 flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-[350px]">
                        <MachineCreate zones={zones} />
                    </div>
                    <div className="flex-1">
                        <div>
                            <MachinesTable machinesList={machines} />
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
