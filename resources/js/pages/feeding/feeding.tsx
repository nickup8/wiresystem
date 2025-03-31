import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import FeedingTable from './feeding-table';

export default function Feeding({ wires }: any) {
    console.log(wires);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Фидинг',
            href: '/feeding',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Фидинг" />
            <div className="mx-4 mt-4 mb-6">
                <Heading title="Фидинг" description="Вся информация о фидинге. Поиск по проводам и местам хранения" />
            </div>
            <div className="mx-4 mb-6">Здесь будет поиск</div>
            <div className="mx-4 mb-2">
                <FeedingTable wires={wires} />
            </div>
        </AppLayout>
    );
}
