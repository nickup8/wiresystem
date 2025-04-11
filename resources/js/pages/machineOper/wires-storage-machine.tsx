import Heading from '@/components/heading';
import echo from '@/echo';
import { Machine, WireStorage } from '@/types';
import { useEffect, useMemo, useState } from 'react';

export default function WiresStorageMachine({ machine, wires: initialWires }: { machine: Machine; wires: WireStorage[] }) {
    const [wires, setWires] = useState<WireStorage[]>(initialWires);
    const [storagesWork, setStoragesWork] = useState<number[]>([]);
    console.log(storagesWork);

    const wireInWork = (storageId: number) => {
        if (storagesWork.includes(storageId)) {
            setStoragesWork(storagesWork.filter((id) => id !== storageId));
        } else {
            setStoragesWork([...storagesWork, storageId]);
        }
    };

    useEffect(() => {
        echo.private(`wire.${machine.id}`).listen('WireOnMachine', (data: any) => {
            setWires(data.wires);
        });
    }, []);

    const machineStorages = useMemo(() => {
        return {
            B: machine.storages.filter((s) => s.name.endsWith('B')),
            A: machine.storages.filter((s) => s.name.endsWith('A')),
        };
    }, [machine.storages]);

    return (
        <>
            <Heading className="ml-8" title={`Провода в рабочих ячейках машины ${machine.name}`} />

            {Object.entries(machineStorages).map(([label, storages]) =>
                storages.length > 0 ? (
                    <div key={label} className="mt-4 flex first:mt-0">
                        <div className="flex w-8 items-center text-2xl font-bold">{label}</div>
                        {storages.map((storage) => {
                            const wiresItem = wires.filter((wire) => wire.storage.id === storage.id);
                            const wireMaterials = wiresItem.map((wire) => wire.wire.material).join(', ') || 'Нет провода';
                            const wireDetails =
                                wiresItem
                                    .map((wire) => `${wire.wire.details.type.name} ${wire.wire.details.size.name} ${wire.wire.details.color.name}`)
                                    .join('; ') || '';

                            return (
                                <div
                                    key={storage.id}
                                    className={
                                        '-ml-[1px] flex flex-col items-center border border-gray-300 ' +
                                        (!storagesWork.includes(storage.id) ? '' : '')
                                    }
                                >
                                    <div
                                        className={
                                            'w-32 cursor-pointer border-b px-4 pt-2 pb-2 text-center ' +
                                            (storagesWork.includes(storage.id) ? 'bg-green-200' : '')
                                        }
                                        onClick={(prev) => wireInWork(storage.id)}
                                    >
                                        {storage.name}
                                    </div>
                                    <div className="font-bold">{wireMaterials}</div>
                                    <div className="mt-1 text-xs text-gray-500">{wireDetails}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : null,
            )}

            <div className="mt-3 ml-8">
                <span className="font-bold text-red-500">Внимание!!!</span> Запрещено использовать провода не из своих рабочих ячеек
            </div>
        </>
    );
}
