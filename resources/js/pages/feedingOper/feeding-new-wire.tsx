import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

export default function FeedingNewWire() {
    const form = useForm({
        defaultValues: {
            barcode: '',
            storage_name: '',
        },
    });

    const { control, handleSubmit, getValues } = form;
    const submit = () => {
        router.post(route('wire.moving'), getValues());
    };
    return (
        <div>
            <HeadingSmall title="Перемещение провода" />
            <Form {...form}>
                <form className="mt-4 flex flex-col gap-4" noValidate onSubmit={handleSubmit(submit)}>
                    <FormField
                        control={control}
                        name="barcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Штрих-код</FormLabel>
                                <FormControl>
                                    <Input placeholder="Штрих-код" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="storage_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Место хранения</FormLabel>
                                <FormControl>
                                    <Input placeholder="Место хранения" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Переместить</Button>
                </form>
            </Form>
        </div>
    );
}
