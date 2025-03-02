import { PropsWithChildren } from 'react';

export default function H3({ children, className }: { className?: string } & PropsWithChildren) {
    return <h3 className={'scroll-m-20 text-2xl font-semibold tracking-tight ' + className}>{children}</h3>;
}
