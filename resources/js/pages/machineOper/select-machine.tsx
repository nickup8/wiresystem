import Heading from '@/components/heading';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Machine } from '@/types';
import { useForm } from 'react-hook-form';

export function SelectMachine({ machines }: { machines: Machine[] }) {
    const form = useForm();
    return (
        <>
            <Heading title="Выбери оборудование" description="Выбери оборудование из списка и нажми кнопку Подтвердить" />
            <Form {...form}>
                <form>
                    <div className="mt-4">
                        <FormField
                            control={form.control}
                            name="zone_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Оборудование</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className={form.formState.errors.zone_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Выберите оборудование" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {machines.map((machine: Machine) => (
                                                    <SelectItem key={machine.id} value={machine.id.toString()}>
                                                        {machine.name}
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
                </form>
            </Form>
        </>
    );
}
