import AddressForm from "@/components/addresses/address_form";
import Button from "@/components/common/button";
import Select from "@/components/common/forms/select";
import TextField from "@/components/common/forms/text_field";
import Modal from "@/components/common/modal"
import { ServiceType, ServiceTypeUtils } from "@/enums/serviceType";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type ServicesFilterModalProps = {
    onSubmission: (name: string | null, type: number | null, state: string | null, city: string | null) => void;
    close: () => void;
}

const servicesFilterFormSchema = z.object({
    name: z.string()
        .nullable(),
    type: z.string()
        .nullable(),
    state: z.string()
        .nullable(),
    city: z.string()
        .nullable()
});
type ServicesFilterFormData = z.infer<typeof servicesFilterFormSchema>;

export default function ServicesFilterModal({ onSubmission, close }: ServicesFilterModalProps) {
    const servicesFilterForm = useForm<ServicesFilterFormData>({
        resolver: zodResolver(servicesFilterFormSchema),
        defaultValues: {
            name: null,
            type: null,
            state: null,
            city: null
        }
    });
    const { handleSubmit, formState: { errors }, reset, setValue } = servicesFilterForm;

    return (
        <Modal title="Filtrar Serviços" close={close}>
            <FormProvider {...servicesFilterForm}>
                <form onSubmit={handleSubmit((servicesFilterFormData: ServicesFilterFormData) => {
                    onSubmission(servicesFilterFormData.name,
                        servicesFilterFormData.type ? ServiceTypeUtils.toNumber(servicesFilterFormData.type)! : null,
                        servicesFilterFormData.state,
                        servicesFilterFormData.city,
                    );

                    close();
                })}>
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="Nome"
                            name="name"
                        />
                        {errors.name && <span className="text-xs text-red mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="p-1">
                        <Select
                            title="Tipo"
                            name="type"
                            options={Object.values(ServiceType) as Array<string>}
                            includeEmptyOption={true}
                        />
                        {errors.type && <span className="text-xs text-red mt-1">{errors.type.message}</span>}
                    </div>

                    <AddressForm onlyFederationInfo={true} setValue={setValue} errors={errors} />

                    <div className="flex justify-center items-center mt-5">
                        <Button color="gray" className="mr-2" onClick={() => reset()}>Cancelar</Button>
                        <Button type="submit" color="green" className="ml-2">Filtrar</Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}