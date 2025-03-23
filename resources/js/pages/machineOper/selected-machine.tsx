import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Machine, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import TableMachine from './table-machine';

export default function SelectedMachine({ machine }: { machine: Machine }) {
    console.log(machine);

    const levelAMachineStorages = machine.storages.filter((storage) => storage.name.endsWith('A'));
    const levelBMachineStorages = machine.storages.filter((storage) => storage.name.endsWith('B'));
    const user = usePage<SharedData>().props.auth.user;
    const form = useForm();
    return (
        <AppHeaderLayout>
            <Head title={machine.name} />
            <div className="mx-4 mt-4 mb-6">
                <div className="text-center">
                    <Heading title={`Машина: ${machine.name}`} />
                </div>
                <div className="mt-6">
                    <Form {...form}>
                        <form className="flex w-full items-end justify-center gap-4">
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
                                <Button variant="default">Заказать</Button>
                                <Button variant="outline">Отменить</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="mt-24 flex gap-6">
                    <div className="flex-1">
                        <Heading className="ml-8" title={'Провода в рабочих ячейках машины ' + machine.name} />

                        {levelBMachineStorages.length > 0 && (
                            <div className="mt-4 flex">
                                <div className="flex w-8 items-center text-2xl font-bold">B</div>
                                {levelBMachineStorages.map((storage) => (
                                    <div key={storage.id} className="-ml-[1px] flex flex-col items-center border py-2">
                                        <div className="mb-2 w-32 border-b px-4 pb-2 text-center">{storage.name}</div>
                                        <div>123</div>
                                        <div>123</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {levelAMachineStorages.length > 0 && (
                            <div className="mt-4 flex">
                                <div className="flex w-8 items-center text-2xl font-bold">A</div>
                                {levelAMachineStorages.map((storage) => (
                                    <div key={storage.id} className="-ml-[1px] flex flex-col items-center border py-2">
                                        <div className="mb-2 w-32 border-b px-4 pb-2 text-center">{storage.name}</div>
                                        <div>123</div>
                                        <div>123</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-3 ml-8">
                            <span className="font-bold text-red-500">Внимание!!!</span> Запрещено использовать провода не из своих рабочих ячеек
                        </div>
                    </div>
                    <div className="min-w-[350px]">
                        <TableMachine />
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
