"use client";

import { FederationController } from "@/controllers/federation";
import { DistrictResponseDTO } from "@/dtos/responses/federations/districtResponseDTO";
import { RegionResponseDTO } from "@/dtos/responses/federations/regionResponseDTO";
import { StateResponseDTO } from "@/dtos/responses/federations/stateResponseDTO";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import TextField from "../common/forms/text_field";
import TextArea from "../common/forms/textarea";
import SelectObject from "../common/forms/select_object";

type AddressFormProps = {
    onlyFederationInfo?: boolean;
    errors: any;
}

export default function AddressForm({ onlyFederationInfo, errors }: AddressFormProps) {
    const [states, setStates] = useState<Array<{ id: string, name: string }>>([]);
    const [currentSelectedStateId, setCurrentSelectedStateId] = useState<string | undefined>(undefined);

    const [regions, setRegions] = useState<Array<{ id: string, name: string }>>([]);
    const [currentSelectedRegionId, setCurrentSelectedRegionId] = useState<string | undefined>(undefined);

    const [districts, setDistricts] = useState<Array<{ id: string, name: string }>>([]);

    const fetchStates = () => {
        FederationController.getStates()
            .then((response: AxiosResponse<StateResponseDTO[]>) => setStates(response.data))
            .catch(() => enqueueSnackbar("Erro ao carregar os estados", {
                variant: "error"
            }));
    }

    const fetchRegions = (stateId: string) => {
        FederationController.getRegionsByState(stateId)
            .then((response: AxiosResponse<RegionResponseDTO[]>) => setRegions(response.data))
            .catch(() => enqueueSnackbar("Erro ao carregar as regiões", {
                variant: "error"
            }));
    }

    const fetchDistricts = (regionId: string) => {
        FederationController.getDistrictsByRegion(regionId)
            .then((response: AxiosResponse<DistrictResponseDTO[]>) => setDistricts(response.data))
            .catch(() => enqueueSnackbar("Erro ao carregar os municípios", {
                variant: "error"
            }));
    }

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (states.length > 0) {
            setCurrentSelectedStateId(states[0].id);
        } else {
            setCurrentSelectedStateId(undefined);
        }
    }, [states]);

    useEffect(() => {
        if (currentSelectedStateId) {
            fetchRegions(currentSelectedStateId);
        } else {
            setRegions([]);
        }
    }, [currentSelectedStateId]);

    useEffect(() => {
        if (regions.length > 0) {
            setCurrentSelectedRegionId(regions[0].id);
        } else {
            setCurrentSelectedRegionId(undefined);
        }
    }, [regions]);

    useEffect(() => {
        if (currentSelectedRegionId) {
            fetchDistricts(currentSelectedRegionId);
        } else {
            setDistricts([]);
        }
    }, [currentSelectedRegionId]);

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
                        onChangeFunction={(stateId: string) => setCurrentSelectedStateId(stateId)}
                    />
                </div>
                <div className="p-1">
                    <SelectObject
                        title="Região"
                        name="region"
                        objects={regions}
                        includeEmptyOption={onlyFederationInfo ? true : false}
                        toStringFunction={(region: { id: string, name: string }) => region.name}
                        onChangeFunction={(regionId: string) => setCurrentSelectedRegionId(regionId)}
                    />
                </div>
                <div className="p-1">
                    <SelectObject
                        title="Município"
                        name="district"
                        objects={districts}
                        includeEmptyOption={onlyFederationInfo ? true : false}
                        toStringFunction={(district: { id: string, name: string }) => district.name}
                    />
                </div>
            </div>

            {!onlyFederationInfo && (
                <div>
                    <div className="grid grid-cols-2 gap-2">
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
                                type="number"
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