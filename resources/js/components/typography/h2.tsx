import { PropsWithChildren } from "react";

export default function H2({children, className}: {className?: string} & PropsWithChildren) {
    return (
        <h2 className={"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 " + className}>{children}</h2>
    );
}
