import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import WireColorCreate from './wire-color-create';

export default function WireColor() {
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
                            Здесь будет вывод цвета
                            <div className="mt-4 text-red-500">
                                <HeadingSmall title="Доделать вывод цвета проводов из базы данных" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
