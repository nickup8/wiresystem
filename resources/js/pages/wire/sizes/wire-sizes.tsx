import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import WireSizeCreate from './wire-size-create';

export default function WireSizes() {
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
                            Здесь будет вывод сечений
                            <div className="mt-4 text-red-500">
                                <HeadingSmall title="Доделать вывод сечений проводов из базы данных" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
