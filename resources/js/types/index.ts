import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavSubItem {
    title: string;
    url: string;
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavSubItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Zone {
    id: number;
    zone: string;
    created_at: Date;
    updated_at: Date;
}

export interface StoragesList {
    id: number;
    rack: string;
    zone: Zone;
    start_level: number;
    level_count: number;
    start_storage: number;
    finish_storage: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PaginationProps<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface Machine {
    id: number;
    name: string;
    zone: Zone;
    storages: Storage[];
}

export interface WireType {
    name: string;
    barcode: string;
}
export interface WireSize {
    name: string;
    barcode: string;
}
export interface WireColor {
    name: string;
    barcode: string;
}
