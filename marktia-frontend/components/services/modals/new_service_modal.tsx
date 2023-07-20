"use client";

import AddressForm from "@/components/addresses/address_form";
import Button from "@/components/common/button";
import Select from "@/components/common/forms/select";
import TextField from "@/components/common/forms/text_field";
import TextArea from "@/components/common/forms/textarea";
import Modal from "@/components/common/modal";
import { AuthContext } from "@/contexts/AuthContext";
import { ServicesController } from "@/controllers/services";
import { UsersController } from "@/controllers/users";
import { ServiceRequestDTO } from "@/dtos/requests/services/serviceRequestDTO";
import { AddressResponseDTO } from "@/dtos/responses/address/AddressResponseDTO";
import { ServiceResponseDTO } from "@/dtos/responses/services/serviceResponseDTO";
import { ServiceType, ServiceTypeUtils } from "@/enums/serviceType";
import { Address } from "@/models/address";
import { handleError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type NewServiceModalProps = {
    onSubmission: (service: string) => void;
    close: () => void;
}

const newServiceFormSchema = z.object({
    title: z.string()
        .nonempty({
            message: "O título não pode ser vazio."
        }),
    type: z.string(),
    description: z.string()
        .nonempty({
            message: "A descrição não pode ser vazia."
        }),
    price: z.number({
        invalid_type_error: "O preço não pode ser vazio."
    })
        .nonnegative({
            message: "O preço não pode ser negativo."
        }),
    picpayUser: z.string()
        .nonempty({
            message: "O usuário do PicPay não pode ser vazio."
        }),
    state: z.string()
        .nonempty({
            message: "O estado não pode ser vazio."
        }),
    city: z.string()
        .nonempty({
            message: "A cidade não pode ser vazia."
        }),
    district: z.string()
        .nonempty({
            message: "O bairro não pode ser vazio."
        }),
    publicPlace: z.string()
        .nonempty({
            message: "A rua não pode ser vazia."
        }),
    number: z.string()
        .nonempty({
            message: "O número não pode ser vazio."
        }),
    complement: z.string()
        .nullable()
});
type NewServiceFormData = z.infer<typeof newServiceFormSchema>;

export default function NewServiceModal({ onSubmission, close }: NewServiceModalProps) {
    const [useMyAddress, setUseMyAddress] = useState(false);

    const { token, user } = useContext(AuthContext);
    const router = useRouter();

    const newServiceForm = useForm<NewServiceFormData>({
        resolver: zodResolver(newServiceFormSchema),
        defaultValues: {
            title: "",
            type: ServiceType.DESIGN_GRAFICO,
            description: "",
            price: undefined,
            picpayUser: ""
        }
    });
    const { handleSubmit, formState: { errors }, reset, setValue } = newServiceForm;

    const handleNewServiceFormSubmission = (newServiceFormData: NewServiceFormData) => {
        if (token && user) {
            const serviceRequestDTO: ServiceRequestDTO = {
                providerId: user.id,
                title: newServiceFormData.title,
                type: ServiceTypeUtils.toNumber(newServiceFormData.type)!,
                description: newServiceFormData.description,
                price: newServiceFormData.price,
                picpayUser: newServiceFormData.picpayUser,
                address: !useMyAddress ? {
                    state: newServiceFormData.state,
                    city: newServiceFormData.city,
                    district: newServiceFormData.district,
                    publicPlace: newServiceFormData.publicPlace,
                    number: newServiceFormData.number,
                    complement: newServiceFormData.complement
                } : null
            }

            ServicesController.create(serviceRequestDTO, token)
                .then((response: AxiosResponse<ServiceResponseDTO>) => {
                    onSubmission(response.data.title);

                    close();
                })
                .catch((error: AxiosError) => handleError("Houve um erro ao criar o serviço.", {
                    errors: error.response?.data as any
                }));
        }
    }

    const handleUseMyAddress = () => {
        if (!useMyAddress) {
            if (token && user) {
                UsersController.getAddress(user.id, token)
                    .then((response: AxiosResponse<AddressResponseDTO>) => {
                        const address: Address = response.data;

                        setValue("state", address.state);
                        setValue("city", address.city);

                        setValue("district", address.district);
                        setValue("publicPlace", address.publicPlace);
                        setValue("number", address.number);
                        setValue("complement", address.complement);

                        setUseMyAddress(true);
                    })
                    .catch((error: AxiosError) => handleError("Houve um erro ao carregar o endereço do usuário.", {
                        errors: error.response?.data as any
                    }));
            }
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
                            {errors.title && <span className="text-xs text-red mt-1">{errors.title.message}</span>}
                        </div>
                        <div className="p-1">
                            <Select
                                title="Tipo"
                                name="type"
                                options={Object.values(ServiceType) as Array<string>}
                            />
                            {errors.type && <span className="text-xs text-red mt-1">{errors.type.message}</span>}
                        </div>
                    </div>
                    <div className="p-1">
                        <TextArea
                            label="Descrição"
                            name="description"
                        />
                        {errors.description && <span className="text-xs text-red mt-1">{errors.description.message}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-1">
                            <TextField
                                type="number"
                                label="Preço"
                                name="price"
                            />
                            {errors.price && <span className="text-xs text-red mt-1">{errors.price.message}</span>}
                        </div>
                        <div className="p-1">
                            <TextField
                                type="text"
                                label="Usuário do PicPay para Pagamento"
                                name="picpayUser"
                            />
                            {errors.picpayUser && <span className="text-xs text-red mt-1">{errors.picpayUser.message}</span>}
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-1 my-2">
                        <div className="mr-2"><span>Deseja usar seu endereço para o serviço? Preencha o formulário abaixo caso contrário.</span></div>
                        <Button color="blue" onClick={() => handleUseMyAddress()}>Carregar meu endereço</Button>
                    </div>

                    <AddressForm setValue={setValue} errors={errors} />

                    <div className="flex justify-center items-center mt-5">
                        <Button color="gray" className="mr-2" onClick={() => {
                            reset();
                            setUseMyAddress(false);
                        }}>Cancelar</Button>
                        <Button type="submit" color="green" className="ml-2">Salvar</Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}