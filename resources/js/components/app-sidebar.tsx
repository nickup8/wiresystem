import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Archive, BookOpen, Cable, ChartNoAxesCombined, ChartPie, Cpu, Diameter, Folder, LayoutGrid, PaintBucket } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Отчеты',
        url: '/dashboard',
        icon: ChartNoAxesCombined,
    },
    {
        title: 'Фидинг',
        url: '/feeding',
        icon: LayoutGrid,
    },
    {
        title: 'Зоны',
        url: '/zones',
        icon: ChartPie,
    },
    {
        title: 'Места хранения',
        url: '/storages',
        icon: Archive,
    },
    {
        title: 'Оборудование',
        url: '/machines',
        icon: Cpu,
    },
    {
        title: 'Типы проводов',
        url: '/wire-types',
        icon: Cable,
    },
    {
        title: 'Цвета провода',
        url: '/wire-colors',
        icon: PaintBucket,
    },
    {
        title: 'Сечения провода',
        url: '/wire-sizes',
        icon: Diameter,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
