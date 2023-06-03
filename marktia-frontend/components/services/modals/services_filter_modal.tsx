import Button from "@/components/common/button";
import Select from "@/components/common/forms/select";
import TextField from "@/components/common/forms/text_field";
import Modal from "@/components/common/modal"
import { ServiceType } from "@/enums/serviceType";
import { ServicesFilter } from "@/utils/servicesFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type ServicesFilterModalProps = {
    onSubmission: (servicesFilter: ServicesFilter) => void;
    close: () => void;
}

const servicesFilterFormSchema = z.object({
    name: z.string(),
    addressId: z.number(),
    type: z.string()
});
type ServicesFilterFormData = z.infer<typeof servicesFilterFormSchema>;

export default function ServicesFilterModal({ onSubmission, close }: ServicesFilterModalProps) {
    const servicesFilterForm = useForm<ServicesFilterFormData>({
        resolver: zodResolver(servicesFilterFormSchema),
        defaultValues: {
            name: "",
            addressId: undefined,
            type: ServiceType.DESIGN_GRAFICO
        }
    });
    const { handleSubmit, formState: { errors }, reset } = servicesFilterForm;

    return (
        <Modal title="Filtrar Serviços" close={close}>
            <FormProvider {...servicesFilterForm}>
                <form onSubmit={handleSubmit((servicesFilterFormData: ServicesFilterFormData) => {
                    onSubmission({
                        name: servicesFilterFormData.name,
                        addressId: servicesFilterFormData.addressId.toString(),
                        type: ServiceType.toNumber(servicesFilterFormData.type)
                    });

                    close();
                })}>
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="Nome"
                            name="name"
                        />
                        {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="p-1">
                        <TextField
                            type="number"
                            label="ID do Endereço"
                            name="addressId"
                        />
                        {errors.addressId && <span className="text-xs text-red-500 mt-1">{errors.addressId.message}</span>}
                    </div>

                    <div className="p-1">
                        <Select
                            title="Tipo"
                            name="type"
                            options={Object.values(ServiceType) as Array<string>}
                        />
                        {errors.type && <span className="text-xs text-red-500 mt-1">{errors.type.message}</span>}
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <Button>Cancelar</Button>
                        <Button type="submit" color="green">Login</Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}