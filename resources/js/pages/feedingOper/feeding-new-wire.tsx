import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

export default function FeedingNewWire() {
    const form = useForm();
    return (
        <div>
            <HeadingSmall title="Новый провод" />
            <Form {...form}>
                <form className="mt-4 flex flex-col gap-4">
                    <FormField
                        control={form.control}
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
                        control={form.control}
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
                    <Button type="submit">Добавить</Button>
                </form>
            </Form>
        </div>
    );
}
