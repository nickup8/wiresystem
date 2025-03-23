import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { BreadcrumbItem, Machine } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { SelectMachine } from './select-machine';

export default function MachineOper({ machines, machine }: { machines: Machine[]; machine: Machine }) {
    const [localMachine, setLocalMachine] = useState<number | null>(1);
    if (localMachine) {
        router.visit(route('machines.show', localMachine));
    }
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Machine Oper',
            href: '/machineOper/machineOper',
        },
    ];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Machine Oper" />
            <div className="mx-4 mt-4 mb-6">
                <SelectMachine machines={machines} />
            </div>
        </AppHeaderLayout>
    );
}
