import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { WireSize } from '@/types';
import { Head } from '@inertiajs/react';
import WireSizeCreate from './wire-size-create';
import WireSizeTable from './wire-size-table';

export default function WireSizes({ wireSizes }: { wireSizes: WireSize[] }) {
    return (
        <AppLayout>
            <Head title="Сечения проводов" />
            <div className="mx-4 mt-4 mb-6">
                <Heading title="Сечения проводов" description="Добавьте коды используемых сечений проводов. " />
            </div>
            <div className="mx-4 flex h-full flex-1 flex-col gap-4 rounded-xl">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-[350px]">
                        <WireSizeCreate />
                    </div>
                    <div className="flex-1">
                        <div>
                            <WireSizeTable wireSizes={wireSizes} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
