import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zone } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

export default function FeedingZones({ zones }: { zones: Zone[] }) {
    const { props } = usePage(); // Получаем текущие props от Inertia

    const form = useForm({
        defaultValues: {
            zone_id: 'all',
        },
    });

    const handleZoneChange = (zoneId: string) => {
        form.setValue('zone_id', zoneId);
        console.log(zoneId);
        router.get(window.location.pathname, { zone_id: zoneId }, { preserveState: true });
    };

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
                                    <Select onValueChange={handleZoneChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Выберите зону" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Все зоны</SelectItem>
                                            {zones.map((zone: Zone) => (
                                                <SelectItem key={zone.id} value={zone.id.toString()} onChange={field.onChange}>
                                                    {zone.zone}
                                                </SelectItem>
                                            ))}
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
