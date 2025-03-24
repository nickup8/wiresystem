import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

export default function FeedingZones() {
    const form = useForm({
        defaultValues: {
            zone_id: 'all',
        },
    });
    return (
        <>
            <Form {...form}>
                <form>
                    <FormField
                        control={form.control}
                        name="zone_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Зона</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Выберите зону" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Все зоны</SelectItem>
                                            <SelectItem value="1">Зона 1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    );
}
