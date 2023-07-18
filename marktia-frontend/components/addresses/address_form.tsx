"use client";

import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import TextField from "../common/forms/text_field";
import TextArea from "../common/forms/textarea";
import { handleError } from "@/utils/errorHandler";
import { AddressController } from "@/controllers/address";
import Select from "../common/forms/select";

type AddressFormProps = {
    onlyFederationInfo?: boolean;
    setValue: any;
    errors: any;
    initialState?: string;
    initialCity?: string;
}

export default function AddressForm({ onlyFederationInfo, setValue, errors, initialState, initialCity }: AddressFormProps) {
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const isFirstRender = useRef(true);

    const fetchStates = () => {
        AddressController.getStates()
            .then((response: AxiosResponse<string[]>) => setStates(response.data))
            .catch((error: AxiosError) => handleError("Erro ao carregar os estados.", {
                errors: error.response?.data as any
            }));
    }

    const fetchCities = (state: string) => {
        AddressController.getCities(state)
            .then((response: AxiosResponse<string[]>) => setCities(response.data))
            .catch((error: AxiosError) => handleError("Erro ao carregar as cidades.", {
                errors: error.response?.data as any
            }));
    }

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (states.length > 0) {
            if (isFirstRender.current && onlyFederationInfo) {
                isFirstRender.current = false;
            } else {
                if (!initialState) {
                    setValue("state", states[0]);
                } else {
                    setValue("state", initialState);
                }
                
                fetchCities(states[0]);
            }
        } else {
            setValue("state", "");
            setCities([]);
        }
    }, [states]);

    useEffect(() => {
        if (cities.length > 0) {
            if (!initialCity) {
                setValue("city", cities[0]);
            } else {
                setValue("city", initialCity);
            }
        } else {
            if (!initialCity) {
                setValue("city", "");
            } else {
                setValue("city", initialCity);
            }
        }
    }, [cities]);

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <div className="p-1">
                    <Select
                        title="Estado"
                        name="state"
                        options={states}
                        includeEmptyOption={onlyFederationInfo ? true : false}
                        onChangeFunction={(state: string) => fetchCities(state)}
                    />
                    {errors.state && <span className="text-xs text-red mt-1">{errors.state.message}</span>}
                </div>
                <div className="p-1">
                    {cities.length === 0 ? (
                        <div>
                            <TextField
                                type="text"
                                label="Cidade"
                                name="city"
                            />
                        </div>
                    ) : (
                        <div>
                            <Select
                                title="Cidade"
                                name="city"
                                options={cities}
                                includeEmptyOption={onlyFederationInfo ? true : false}
                            />
                        </div>
                    )}
                    {errors.city && <span className="text-xs text-red mt-1">{errors.city.message}</span>}
                </div>
            </div>

            {!onlyFederationInfo && (
                <div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="p-1">
                            <TextField
                                type="text"
                                label="Bairro"
                                name="district"
                            />
                            {errors.district && <span className="text-xs text-red mt-1">{errors.district.message}</span>}
                        </div>
                        <div className="p-1">
                            <TextField
                                type="text"
                                label="Rua"
                                name="publicPlace"
                            />
                            {errors.publicPlace && <span className="text-xs text-red mt-1">{errors.publicPlace.message}</span>}
                        </div>
                        <div className="p-1">
                            <TextField
                                type="text"
                                label="Número"
                                name="number"
                            />
                            {errors.number && <span className="text-xs text-red mt-1">{errors.number.message}</span>}
                        </div>
                    </div>
                    <div className="p-1">
                        <TextArea
                            label="Complemento"
                            name="complement"
                        />
                        {errors.complement && <span className="text-xs text-red mt-1">{errors.complement.message}</span>}
                    </div>
                </div>
            )}
        </div>
    )
}