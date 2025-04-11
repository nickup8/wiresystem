import HeadingSmall from '@/components/heading-small';
import { Machine } from '@/types';
import MachineSettings from './machine-settings';
import MachineTypeTabs from './machine-type-tabs';

export default function MachineType({ machine }: { machine: Machine }) {
    return (
        <MachineSettings machine={machine}>
            <div>
                <div className="mb-4">
                    <HeadingSmall title="Тип машины" description="Выберите тип машины. Одиночные провода или марьяжи" />
                </div>
            </div>
            <MachineTypeTabs machine={machine} />
        </MachineSettings>
    );
}
