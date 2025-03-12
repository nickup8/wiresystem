import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zone } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function MachineCreate({ zones }: { zones: Zone[] }) {
    const formSchema = z.object({
        name: z.string({ message: 'Поле обязательно для заполнения' }).min(1, { message: 'Поле не может быть пустым' }),
        zone_id: z.preprocess(
            (val) => (val === '' ? null : Number(val)),
            z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
        ),
    });

    const [isSending, setIsSending] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            zone_id: null,
        },
    });

    const submit = () => {
        setIsSending(true);
        const data = form.getValues();
        data.zone_id = Number(data.zone_id);

        router.post(route('machines.store'), data, {
            onSuccess: () => {
                form.reset();
                setIsSending(false);
            },
            onError: () => setIsSending(false),
        });
    };
    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
            <HeadingSmall title="Создание оборудования" description="Заполните поля ниже. Все поля обязательны" />
            <div className="mt-4">
                {zones.length > 0 ? (
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
                                                <Input
                                                    placeholder="01-263-****"
                                                    value={field.value ?? ''}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                />
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
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger className={form.formState.errors.zone_id ? 'border-red-500' : ''}>
                                                        <SelectValue placeholder="Выберите зону" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {zones.map((zone: Zone) => (
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
                                    Создать
                                </Button>
                                <Button variant="outline" disabled={isSending || !form.formState.isDirty} onClick={() => form.reset()}>
                                    Очистить
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div>Создайте для начала зоны</div>
                )}
            </div>
        </div>
    );
}
