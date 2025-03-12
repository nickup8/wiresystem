import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zone } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function StoragesCreate({ zones }: { zones: Zone[] }) {
    useEffect(() => {
        return () => {
            form.reset();
        };
    }, [zones]);

    const formSchema = z.object({
        rack: z.string({ message: 'Поле обязательно для заполнения' }).min(1, { message: 'Поле не может быть пустым' }),
        zone_id: z.preprocess(
            (val) => (val === '' ? null : Number(val)),
            z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
        ),
        start_level: z.preprocess(
            (val) => (val === '' ? null : Number(val)),
            z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
        ),
        level_count: z.preprocess(
            (val) => (val === '' ? null : Number(val)),
            z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
        ),
        start_storage: z.preprocess(
            (val) => (val === '' ? null : Number(val)),
            z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
        ),
        finish_storage: z.preprocess(
            (val) => (val === '' ? null : Number(val)),
            z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
        ),
    });

    const [isSending, setIsSending] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rack: '',
            zone_id: null,
            start_level: null,
            level_count: null,
            start_storage: null,
            finish_storage: null,
        },
    });

    const submit = () => {
        setIsSending(true);
        const data = form.getValues();
        data.zone_id = Number(data.zone_id);

        router.post(route('storages.store'), data, {
            onSuccess: () => {
                form.reset();
                setIsSending(false);
            },
            onError: () => setIsSending(false),
        });
    };
    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
            <HeadingSmall title="Создание мест хранения" description="Заполните поля ниже. Все поля обязательны" />
            <div className="mt-4">
                {zones.length > 0 ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submit)}>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="rack"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Название река</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="A, B, C..."
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
                            <div className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="start_level"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Начальный уровень</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1, 2, 3..."
                                                    value={field.value ?? ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
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
                                    name="level_count"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Количество уровней</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1, 2, 3..."
                                                    value={field.value ?? ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
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
                                    name="start_storage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Начальное место хранения</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1, 2, 3..."
                                                    value={field.value ?? ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
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
                                    name="finish_storage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Конечное место хранения</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1, 2, 3..."
                                                    value={field.value ?? ''}
                                                    onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                                                />
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
