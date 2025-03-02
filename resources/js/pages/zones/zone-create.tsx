import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    zone: z.preprocess(
        (val) => (val === '' ? null : Number(val)),
        z.number({ message: 'Номер зоны должен быть числом' }).gt(0, { message: 'Номер зоны должен быть больше 0' }).nullable(),
    ),
});

export default function ZoneCreate() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            zone: null,
        },
    });

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
            <HeadingSmall title="Создание зоны" description="Введите номер новой зоны в поле ниже" />
            <div className="mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
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
                            <Button type="submit">Создать</Button>
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
