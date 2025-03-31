import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { WireColor } from '@/types';
import { Head } from '@inertiajs/react';
import WireColorCreate from './wire-color-create';
import WireColorTable from './wire-color-table';

export default function WireColors({ wireColors }: { wireColors: WireColor[] }) {
    return (
        <AppLayout>
            <Head title="Цвета проводов" />
            <div className="mx-4 mt-4 mb-6">
                <Heading title="Цвета проводов" description="Добавьте коды используемых цветов проводов. " />
            </div>
            <div className="mx-4 flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-[350px]">
                        <WireColorCreate />
                    </div>
                    <div className="flex-1">
                        <div>
                            <WireColorTable wireColors={wireColors} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
