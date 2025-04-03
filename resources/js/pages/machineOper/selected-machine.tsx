import Heading from '@/components/heading';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Machine, SharedData, Storage, WireStorage } from '@/types';

import { Button } from '@/components/ui/button';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import FormMachineWire from './form-machine-wire';
import TableMachine from './table-machine';
import WiresStorageMachine from './wires-storage-machine';

export default function SelectedMachine({ machine, wires }: { machine: Machine; wires: WireStorage[] }) {
    const user = usePage<SharedData>().props.auth.user;

    const [storages, setStorages] = useState<Storage[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [wire, setWire] = useState<string | null>(null);

    // Группируем провода по складам
    const wireStoragesMap = useMemo(() => {
        return wires.reduce((acc: Record<string, Storage[]>, wire) => {
            if (!acc[wire.wire.material]) acc[wire.wire.material] = [];
            acc[wire.wire.material].push(wire.storage);
            return acc;
        }, {});
    }, [wires]);

    const orderWire = (material: string | null) => {
        if (material === null) return;
        setShowModal(false);
        console.log('orderedWire:', material);
    };
    const submit = (data: { material: string }) => {
        const foundStorages = wireStoragesMap[data.material] || [];
        if (foundStorages.length > 0) {
            setStorages(foundStorages);
            setShowModal(true);
            setWire(data.material);
        } else {
            orderWire(data.material);
        }
    };

    return (
        <AppHeaderLayout>
            <Head title={machine.name} />
            <div className="mx-4 mt-4 mb-6">
                <div className="text-center">
                    <Heading title={`Машина: ${machine.name}`} />
                </div>
                <div className="mt-6">
                    <FormMachineWire submit={submit} />
                </div>
                <div className="mt-24 flex gap-6">
                    <div className="flex-1">
                        <WiresStorageMachine machine={machine} wires={wires} />
                    </div>
                    <div className="min-w-[350px]">
                        <TableMachine />
                    </div>
                </div>
            </div>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Вам нужна дополнительная катушка?</DialogTitle>
                        <DialogDescription>
                            Провод <span className="font-bold text-red-500">{wire}</span> есть в рабочих ячейках:{' '}
                            <span className="font-bold whitespace-nowrap text-red-500">{storages.map((s) => s.name).join(', ')}</span>.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button onClick={() => orderWire(wire)}>Да</Button>

                        <Button onClick={() => setShowModal(false)} variant="outline">
                            Нет
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppHeaderLayout>
    );
}
