import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Machine, type NavItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Toaster } from 'sonner';

export default function MachineSettings({ children, machine }: { children: React.ReactNode; machine: Machine }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Оборудование',
            href: '/machines',
        },
        {
            title: machine.name,
            href: `/machines/${machine.id}`,
        },
    ];
    const sidebarNavItems: NavItem[] = [
        {
            title: 'Информация',
            url: `/machines/${machine.id}/edit`,
            icon: null,
        },
        {
            title: 'Места хранения',
            url: `/machines/${machine.id}/edit/storages`,
            icon: null,
        },
    ];

    const currentPath = window.location.pathname;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Настройки оборудования" />

            <div className="px-6 py-6">
                <div className="mb-6">
                    <Heading
                        title={'Редактирование ' + machine.name}
                        description="Здесь вы можете изменить информацию об оборудовании и добавить рабочие места хранения"
                    />
                </div>

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarNavItems.map((item) => (
                                <Button
                                    key={item.url}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === item.url,
                                    })}
                                >
                                    <Link href={item.url} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 md:hidden" />

                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl">{children}</section>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
