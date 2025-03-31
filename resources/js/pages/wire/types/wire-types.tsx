import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { WireType } from '@/types';
import { Head } from '@inertiajs/react';
import WireTypeCreate from './wire-type-create';
import WireTypesTable from './wire-types-table';

export default function WireTypes({ wireTypes }: { wireTypes: WireType[] }) {
    console.log(wireTypes);

    return (
        <AppLayout>
            <Head title="Типы проводов" />
            <div className="mx-4 mt-4 mb-6">
                <Heading title="Типы проводов" description="Добавьте коды используемых типов проводов. " />
            </div>
            <div className="mx-4 flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-[350px]">
                        <WireTypeCreate />
                    </div>
                    <div className="flex-1">
                        <div>
                            <WireTypesTable wireTypes={wireTypes} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
