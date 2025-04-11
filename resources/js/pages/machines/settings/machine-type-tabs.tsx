import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Machine } from '@/types';
import { router } from '@inertiajs/react';
import { GitMerge, GitPullRequestDraft, LucideIcon } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';

export default function MachineTypeTabs({ className = '', machine, ...props }: { machine: Machine } & HTMLAttributes<HTMLDivElement>) {
    const [type, setType] = useState<number>(machine.type);

    const tabs: { value: number; icon: LucideIcon; label: string }[] = [
        { value: 1, icon: GitPullRequestDraft, label: 'Одиночные' },
        { value: 2, icon: GitMerge, label: 'Марьяжи' },
    ];

    const submit = () => {
        router.put(route('machines.updateType', machine.id), { type });
    };

    return (
        <div className="flex flex-col gap-2">
            <div>
                <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
                    {tabs.map(({ value, icon: Icon, label }) => (
                        <button
                            key={value}
                            onClick={() => setType(value)}
                            className={cn(
                                'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                                'text-neutral-700 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                                type === value
                                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                    : 'text-neutral-700 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                            )}
                        >
                            <Icon className="-ml-1 h-4 w-4" />
                            <span className="ml-1.5 text-sm">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <Button onClick={submit} disabled={type === machine.type}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
}
