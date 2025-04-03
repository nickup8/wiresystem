import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface FormMachineWireProps {
    submit: (data: { material: string }) => void;
}
export default function FormMachineWire({ submit }: FormMachineWireProps) {
    const form = useForm({
        defaultValues: {
            material: '',
        },
    });

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(submit)} className="flex w-full items-end justify-center gap-4">
                <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                        <FormItem className="max-w-80 flex-1">
                            <FormLabel>Заказать провод</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-3">
                    <Button type="submit" variant="default">
                        Заказать
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            form.reset({
                                material: '',
                            })
                        }
                    >
                        Отменить
                    </Button>
                </div>
            </form>
        </Form>
    );
}
