import HeadingSmall from '@/components/heading-small';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Machine, Zone } from '@/types';
import { useForm } from 'react-hook-form';
import MachineSettings from './machine-settings';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export default function MachineInfo({ machine, zones, error, success }: { machine: Machine; zones: Zone[] | null; error: string; success: string }) {
    const [isSending, setIsSending] = useState(false);
    const formSchema = z.object({
        name: z.string({ message: 'Поле обязательно для заполнения' }).min(1, { message: 'Поле не может быть пустым' }),
        zone_id: z.preprocess(
            (val) => (val === '' ? null : Number(val)),
            z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
        ),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: machine.name,
            zone_id: machine.zone ? Number(machine.zone.id) : null,
        },
    });

    useEffect(() => {
        form.reset({
            name: machine.name,
            zone_id: machine.zone ? Number(machine.zone.id) : null,
        });
    }, [machine, form]);

    const submit = () => {
        setIsSending(true);
        const data = form.getValues();
        data.zone_id = data.zone_id ? Number(data.zone_id) : null;
        console.log(data);
        router.put(route('machines.update', machine.id), data, {
            onSuccess: () => {
                form.reset();
                setIsSending(false);
            },
        });
    };
    return (
        <MachineSettings machine={machine}>
            <div className="mb-6">
                <HeadingSmall
                    title="Информация об оборудовании"
                    description="Ниже представлена информация об оборудовании. Вы можете изменить название и зону"
                />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя оборудования</FormLabel>
                                    <FormControl>
                                        <Input placeholder="01-263-****" value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4">
                        <FormField
                            control={form.control}
                            name="zone_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Номер зоны</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={machine.zone?.id?.toString()}>
                                            <SelectTrigger className={form.formState.errors.zone_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Выберите зону" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {zones?.map((zone: Zone) => (
                                                    <SelectItem key={zone.id} value={zone.id.toString()}>
                                                        {zone.zone}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
        </MachineSettings>
    );
}
