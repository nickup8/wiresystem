import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function WireTypeCreate() {
    const formSchema = z.object({
        name: z.string({ message: 'Поле обязательно для заполнения' }).min(1, { message: 'Поле не может быть пустым' }),
        barcode: z.string({ message: 'Поле обязательно для заполнения' }).min(1, { message: 'Поле не может быть пустым' }),
    });
    const [isSending, setIsSending] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            barcode: '',
        },
    });
    const { control, handleSubmit, getValues } = form;

    const submit = () => {
        setIsSending(true);
        router.post(route('wireTypes.store'), getValues(), {
            onSuccess: () => {
                form.reset();
                setIsSending(false);
            },
            onError: () => setIsSending(false),
        });
    };

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
            <HeadingSmall title="Новый тип провода" description="Заполните поля ниже.  Форма не чуствительна к регистру. Все поля обязательны" />
            <Form {...form}>
                <form className="mt-4 flex flex-col gap-4" noValidate onSubmit={handleSubmit(submit)}>
                    <FormField
                        control={control}
                        name="barcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Код типа</FormLabel>
                                <FormControl>
                                    <Input placeholder="BR2" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название</FormLabel>
                                <FormControl>
                                    <Input placeholder="ПВАМ" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-2">
                        <Button type="submit">Создать</Button>
                        <Button type="reset" variant="outline">
                            Сбросить
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
