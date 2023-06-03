"use client";

import Button from "@/components/common/button";
import Select from "@/components/common/forms/select";
import TextField from "@/components/common/forms/text_field";
import TextArea from "@/components/common/forms/textarea";
import Modal from "@/components/common/modal";
import { ServicesController } from "@/controllers/services";
import { ServiceRequestDTO } from "@/dtos/requests/services/serviceRequestDTO";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { ServiceType } from "@/enums/serviceType";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type NewServiceModalProps = {
    onSubmission: (service: string) => void;
    close: () => void;
}

const newServiceFormSchema = z.object({
    title: z.string(),
    type: z.string(),
    description: z.string(),
    addressId: z.number(),
    price: z.number(),
    picpayUser: z.string()
});
type NewServiceFormData = z.infer<typeof newServiceFormSchema>;

export default function NewServiceModal({ onSubmission, close }: NewServiceModalProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const newServiceForm = useForm<NewServiceFormData>({
        resolver: zodResolver(newServiceFormSchema),
        defaultValues: {
            title: "",
            type: ServiceType.DESIGN_GRAFICO,
            description: "",
            addressId: undefined,
            price: undefined,
            picpayUser: ""
        }
    });
    const { handleSubmit, formState: { errors }, reset } = newServiceForm;

    const handleNewServiceFormSubmission = (newServiceFormData: NewServiceFormData) => {
        if (session) {
            const serviceRequestDTO: ServiceRequestDTO = {
                providerId: session.user.id,
                addressId: newServiceFormData.addressId.toString(),
                title: newServiceFormData.title,
                type: ServiceType.toNumber(newServiceFormData.type),
                description: newServiceFormData.description,
                price: newServiceFormData.price,
                picpayUser: newServiceFormData.picpayUser
            }

            ServicesController.create(serviceRequestDTO, session.user.token)
                .then((response: AxiosResponse<ServiceResponseDTO>) => {
                    onSubmission(response.data.title);

                    close();
                })
                .catch(() => enqueueSnackbar("Houve um erro ao criar o serviço!", { variant: "error" }))
        } else {
            router.push("/auth/login");
        }
    }

    return (
        <Modal title="Novo Serviço" close={close}>
            <FormProvider {...newServiceForm}>
                <form onSubmit={handleSubmit((newServiceFormData: NewServiceFormData) => handleNewServiceFormSubmission(newServiceFormData))}>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-1">
                            <TextField
                                type="text"
                                label="Nome"
                                name="title"
                            />
                            {errors.title && <span className="text-xs text-red-500 mt-1">{errors.title.message}</span>}
                        </div>
                        <div className="p-1">
                            <Select
                                title="Tipo"
                                name="type"
                                options={Object.values(ServiceType) as Array<string>}
                            />
                            {errors.type && <span className="text-xs text-red-500 mt-1">{errors.type.message}</span>}
                        </div>
                    </div>
                    <div className="p-1">
                        <TextArea
                            label="Descrição"
                            name="description"
                        />
                        {errors.description && <span className="text-xs text-red-500 mt-1">{errors.description.message}</span>}
                    </div>
                    <div className="p-1">
                        <TextField
                            type="number"
                            label="ID do Endereço"
                            name="addressID"
                        />
                        {errors.addressId && <span className="text-xs text-red-500 mt-1">{errors.addressId.message}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-1">
                            <TextField
                                type="number"
                                label="Preço"
                                name="price"
                            />
                            {errors.price && <span className="text-xs text-red-500 mt-1">{errors.price.message}</span>}
                        </div>
                        <div className="p-1">
                            <TextField
                                type="text"
                                label="Usuário do PicPay para Pagamento"
                                name="picpayUser"
                            />
                            {errors.picpayUser && <span className="text-xs text-red-500 mt-1">{errors.picpayUser.message}</span>}
                        </div>
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