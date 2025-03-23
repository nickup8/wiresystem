import DataTable from '@/components/data-table';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Machine } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MachineSettings from './machine-settings';

export default function MachineStorages({ machine, error, success, storages }: { machine: Machine; error: string; success: string; storages: any }) {
    const [isSending, setIsSending] = useState(false);

    const formSchema = z.object({
        storage_name: z.string({ message: 'Поле обязательно для заполнения' }).min(1, { message: 'Поле не может быть пустым' }),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            storage_name: '',
        },
    });

    const columns = [
        {
            accessorKey: 'name',
            header: 'Место хранения',
        },
        {
            accessorKey: 'zone.zone',
            header: 'Зона',
        },
    ];

    const submit = () => {
        setIsSending(true);
        const data = form.getValues();
        router.post(route('machines.storages.store', machine.id), data, {
            onSuccess: () => {
                form.reset();
                setIsSending(false);
            },
            onError: () => setIsSending(false),
        });
    };
    return (
        <MachineSettings machine={machine}>
            <div>
                <div className="mb-4">
                    <HeadingSmall title="Привязка мест хранения" description="Введите название места хранения и нажмите сохранить" />
                </div>
                <Form {...form}>
                    <form noValidate onSubmit={form.handleSubmit(submit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name="storage_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Место хранения</FormLabel>
                                        <FormControl>
                                            <Input placeholder="A-001-A" value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-4 space-x-2">
                            <Button type="submit" disabled={isSending || !form.formState.isDirty}>
                                {isSending && <Loader2 className="animate-spin" />}
                                Сохранить
                            </Button>
                            <Button variant="outline" disabled={isSending || !form.formState.isDirty} onClick={() => form.reset()}>
                                Очистить
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="mt-8">
                <div className="space-y-6">
                    <HeadingSmall title="Привязанные места хранения" description="Ниже представлены привязанные места хранения" />
                    <DataTable columns={columns} data={storages} />
                </div>
            </div>
        </MachineSettings>
    );
}
