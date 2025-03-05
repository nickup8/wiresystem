import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    zone: z.preprocess(
        (val) => (val === '' ? null : Number(val)),
        z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
    ),
});

export default function ZoneCreate() {
    const [isSending, setIsSending] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            zone: null,
        },
    });

    const submit = () => {
        setIsSending(true);
        router.post(route('zones.store'), form.getValues(), {
            onSuccess: () => {
                form.reset();
                setIsSending(false);
            },
            onError: () => setIsSending(false),
        });
    };

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
            <HeadingSmall title="Создание зоны" description="Введите номер новой зоны в поле ниже" />
            <div className="mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <FormField
                            control={form.control}
                            name="zone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Номер зоны</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Номер зоны"
                                            value={field.value ?? ''}
                                            onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-4 space-x-2">
                            <Button type="submit" disabled={isSending || !form.formState.isDirty}>
                                {isSending && <Loader2 className="animate-spin" />}
                                Создать
                            </Button>
                            <Button variant="outline" onClick={() => form.reset()}>
                                Очистить
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
