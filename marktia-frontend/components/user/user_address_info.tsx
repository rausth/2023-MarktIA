"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import AddressInfo from "../common/addressInfo";
import TextField from "../common/forms/text_field";
import Button from "../common/button";
import { Address } from "@/models/address";

type UserAddressInfoProps = {
    address: Address;
    onSubmission: (address: Address) => void;
}

const editUserAddressFormSchema = z.object({
    state: z.string(),
    county: z.string(),
    district: z.string(),
    publicPlace: z.string(),
    number: z.string(),
    complement: z.string()
});
type EditUserAddressFormData = z.infer<typeof editUserAddressFormSchema>;

export default function UserAddressInfo({ address, onSubmission }: UserAddressInfoProps) {
    const [isEditing, setIsEditing] = useState(false);

    const editUserAddressForm = useForm<EditUserAddressFormData>({
        resolver: zodResolver(editUserAddressFormSchema),
        defaultValues: {
            state: address.state,
            county: address.county,
            district: address.district,
            publicPlace: address.publicPlace,
            number: address.number,
            complement: address.complement
        }
    });
    const { handleSubmit, formState: { errors }, reset } = editUserAddressForm;

    return (
        <div className="p-2">
            {!isEditing ? (
                <AddressInfo address={address} actionOnEditButton={() => setIsEditing(true)} />
            ) : (
                <div>
                    <FormProvider {...editUserAddressForm} >
                        <form onSubmit={handleSubmit((editUserAddressFormData: EditUserAddressFormData) => onSubmission({
                            ...editUserAddressFormData,
                            id: address.id
                        }))}>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="Estado"
                                        name="state"
                                    />
                                    {errors.state && <span className="text-xs text-red mt-1">{errors.state.message}</span>}
                                </div>
                                <div>
                                    <TextField
                                        type="text"
                                        label="Município"
                                        name="county"
                                    />
                                    {errors.county && <span className="text-xs text-red mt-1">{errors.county.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="Bairro"
                                        name="district"
                                    />
                                    {errors.district && <span className="text-xs text-red mt-1">{errors.district.message}</span>}
                                </div>
                                <div>
                                    <TextField
                                        type="text"
                                        label="Rua"
                                        name="publicPlace"
                                    />
                                    {errors.publicPlace && <span className="text-xs text-red mt-1">{errors.publicPlace.message}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <div>
                                    <TextField
                                        type="text"
                                        label="Número"
                                        name="number"
                                    />
                                    {errors.number && <span className="text-xs text-red mt-1">{errors.number.message}</span>}
                                </div>
                                <div>
                                    <TextField
                                        type="text"
                                        label="Complemento"
                                        name="complement"
                                    />
                                    {errors.complement && <span className="text-xs text-red mt-1">{errors.complement.message}</span>}
                                </div>
                            </div>
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