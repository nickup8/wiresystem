import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Zone } from '@/types';
import { Head } from '@inertiajs/react';
import FeedingNewWire from './feeding-new-wire';
import FeedingTable from './feeding-table';
import FeedingZones from './feeding-zones';

export default function FeedingOper({ zones }: { zones: Zone[] }) {
    return (
        <AppHeaderLayout>
            <Head title="Фидинг" />
            <div className="mx-4 my-4 flex h-full justify-between">
                <div className="flex-1 pr-20">
                    <FeedingTable />
                </div>
                <div className="w-80">
                    <div className="flex flex-col gap-8">
                        <FeedingZones zones={zones} />
                        <FeedingNewWire />
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
