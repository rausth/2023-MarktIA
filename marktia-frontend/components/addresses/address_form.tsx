"use client";

import { FederationController } from "@/controllers/federation";
import { RegionResponseDTO } from "@/dtos/responses/federations/regionResponseDTO";
import { StateResponseDTO } from "@/dtos/responses/federations/stateResponseDTO";
import { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import TextField from "../common/forms/text_field";
import TextArea from "../common/forms/textarea";
import SelectObject from "../common/forms/select_object";
import { CountyResponseDTO } from "@/dtos/responses/federations/countyResponseDTO";
import { handleError } from "@/utils/errorHandler";

type AddressFormProps = {
    onlyFederationInfo?: boolean;
    setValue: any;
    errors: any;
    initialStateId?: string;
}

export default function AddressForm({ onlyFederationInfo, setValue, errors, initialStateId }: AddressFormProps) {
    const [states, setStates] = useState<Array<{ id: string, name: string }>>([]);
    const [currentSelectedStateId, setCurrentSelectedStateId] = useState<string | undefined>(undefined);

    const [regions, setRegions] = useState<Array<{ id: string, name: string }>>([]);
    const [currentSelectedRegionId, setCurrentSelectedRegionId] = useState<string | undefined>(undefined);

    const [countys, setCountys] = useState<Array<{ id: string, name: string }>>([]);
    const [currentSelectedCountyId, setCurrentSelectedCountyId] = useState<string | undefined>(undefined);

    const isFirstRender = useRef(true);

    const fetchStates = () => {
        FederationController.getStates()
            .then((response: AxiosResponse<StateResponseDTO[]>) => setStates(response.data))
            .catch((error: AxiosError) => handleError("Erro ao carregar os estados.", {
                errors: error.response?.data as any
            }));
    }

    const fetchRegions = (stateId: string) => {
        FederationController.getRegionsByState(stateId)
            .then((response: AxiosResponse<RegionResponseDTO[]>) => setRegions(response.data))
            .catch((error: AxiosError) => handleError("Erro ao carregar as regiões.", {
                errors: error.response?.data as any
            }));
    }

    const fetchCountys = (stateId: string, regionId: string) => {
        FederationController.getCountysByStateAndRegion(stateId, regionId)
            .then((response: AxiosResponse<CountyResponseDTO[]>) => setCountys(response.data))
            .catch((error: AxiosError) => handleError("Erro ao carregar os municípios.", {
                errors: error.response?.data as any
            }));
    }

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (states.length > 0) {
            if (isFirstRender.current && onlyFederationInfo) {
                setCurrentSelectedStateId(undefined);
                isFirstRender.current = false;
            } else {
                if (!initialStateId) {
                    setCurrentSelectedStateId(states[0].id);
                } else {
                    const idx = states.findIndex((state: {id: string, name: string}) => state.id === initialStateId);
                    setCurrentSelectedStateId(states[idx].id);
                }
            }
        } else {
            setCurrentSelectedStateId(undefined);
        }
    }, [states, onlyFederationInfo, initialStateId]);

    useEffect(() => {
        if (currentSelectedStateId) {
            setValue("state", currentSelectedStateId);
            fetchRegions(currentSelectedStateId);
        } else {
            setValue("state", undefined);
            setRegions([]);
        }
    }, [currentSelectedStateId, setValue]);

    useEffect(() => {
        if (regions.length > 0) {
            setCurrentSelectedRegionId(regions[0].id);
        } else {
            setCurrentSelectedRegionId(undefined);
        }
    }, [regions]);

    useEffect(() => {
        if (currentSelectedStateId && currentSelectedRegionId) {
            setValue("region", currentSelectedRegionId);
            fetchCountys(currentSelectedStateId, currentSelectedRegionId);
        } else {
            setValue("region", undefined);
            setCountys([]);
        }
    }, [currentSelectedRegionId, currentSelectedStateId, setValue]);

    useEffect(() => {
        if (countys.length > 0) {
            setCurrentSelectedCountyId(countys[0].id);
        } else {
            setCurrentSelectedCountyId(undefined);
        }
    }, [countys]);

    useEffect(() => {
        if (currentSelectedStateId && currentSelectedRegionId && currentSelectedCountyId) {
            setValue("county", countys[0].id);
        } else {
            setValue("county", undefined);
        }
    }, [currentSelectedCountyId, countys, currentSelectedStateId, currentSelectedRegionId, setValue]);

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                <div className="p-1">
                    <SelectObject
                        title="Estado"
                        name="state"
                        objects={states}
                        includeEmptyOption={onlyFederationInfo ? true : false}
                        toStringFunction={(state: { id: string, name: string }) => state.name}
                        onChangeFunction={(stateId: string | undefined) => setCurrentSelectedStateId(stateId)}
                    />
                    {errors.state && <span className="text-xs text-red mt-1">{errors.state.message}</span>}
                </div>
                <div className="p-1">
                    <SelectObject
                        title="Região"
                        name="region"
                        objects={regions}
                        includeEmptyOption={onlyFederationInfo ? true : false}
                        toStringFunction={(region: { id: string, name: string }) => region.name}
                        onChangeFunction={(regionId: string | undefined) => setCurrentSelectedRegionId(regionId)}
                    />
                    {errors.region && <span className="text-xs text-red mt-1">{errors.region.message}</span>}
                </div>
                <div className="p-1">
                    <SelectObject
                        title="Município"
                        name="county"
                        objects={countys}
                        includeEmptyOption={onlyFederationInfo ? true : false}
                        toStringFunction={(county: { id: string, name: string }) => county.name}
                    />
                    {errors.county && <span className="text-xs text-red mt-1">{errors.county.message}</span>}
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