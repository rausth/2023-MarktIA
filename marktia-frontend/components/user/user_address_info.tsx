"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import AddressInfo from "../common/addressInfo";
import Button from "../common/button";
import { Address } from "@/models/address";
import { AddressRequestDTO } from "@/dtos/requests/addresses/addressRequestDTO";
import AddressForm from "../addresses/address_form";

type UserAddressInfoProps = {
    address: Address;
    onSubmission: (address: AddressRequestDTO, onSuccess: () => void) => void;
}

const editUserAddressFormSchema = z.object({
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
type EditUserAddressFormData = z.infer<typeof editUserAddressFormSchema>;

export default function UserAddressInfo({ address, onSubmission }: UserAddressInfoProps) {
    const [isEditing, setIsEditing] = useState(false);

    const editUserAddressForm = useForm<EditUserAddressFormData>({
        resolver: zodResolver(editUserAddressFormSchema),
        defaultValues: {
            district: address.district,
            publicPlace: address.publicPlace,
            number: address.number,
            complement: address.complement
        }
    });
    const { handleSubmit, formState: { errors }, reset, setValue } = editUserAddressForm;

    useEffect(() => {
        setValue("district", address.district);
        setValue("publicPlace", address.publicPlace);
        setValue("number", address.number);
        setValue("complement", address.complement);
    }, [address]);

    return (
        <div className="p-2">
            {!isEditing ? (
                <AddressInfo address={address} actionOnEditButton={() => setIsEditing(true)} />
            ) : (
                <div>
                    <FormProvider {...editUserAddressForm} >
                        <form onSubmit={handleSubmit((editUserAddressFormData: EditUserAddressFormData) => onSubmission({
                            state: editUserAddressFormData.state,
                            city: editUserAddressFormData.city,
                            district: editUserAddressFormData.district,
                            publicPlace: editUserAddressFormData.publicPlace,
                            number: editUserAddressFormData.number,
                            complement: editUserAddressFormData.complement
                        }, () => {
                            reset();
                            setIsEditing(false);
                        }))}>
                            <AddressForm errors={errors} setValue={setValue} initialState={address.state} initialCity={address.city} />

                            <div className="mt-5 pb-2">
                                <div className="flex justify-center my-5">
                                    <Button color="gray" className="mr-5" onClick={() => {
                                        reset();
                                        setIsEditing(false);
                                    }}>Cancelar</Button>
                                    <Button type="submit" color="green">Atualizar</Button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            )}
        </div>
    )
}