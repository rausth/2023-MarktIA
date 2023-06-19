"use client";

import { useEffect, useState } from "react";
import Avatar from "../common/avatar";
import Button from "../common/button";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../common/forms/text_field";

type UserImageProps = {
    imageURL?: string;
    onSubmission: (imageURL: string | null, onSuccess: () => void) => void;
}

const editImageFormSchema = z.object({
    imageURL: z.string()
        .nullable()
});
type EditImageFormData = z.infer<typeof editImageFormSchema>;

export default function UserImage({ imageURL, onSubmission }: UserImageProps) {
    const [isEditing, setIsEditing] = useState(false);

    const editImageForm = useForm<EditImageFormData>({
        resolver: zodResolver(editImageFormSchema),
        defaultValues: {
            imageURL: imageURL
        }
    });
    const { handleSubmit, formState: { errors }, reset, setValue } = editImageForm;

    useEffect(() => {
        setValue("imageURL", imageURL ? imageURL : null);
    }, [imageURL]);

    return (
        <div className="w-full">
            {!isEditing ? (
                <div className="grid justify-items-center">
                    <div className="w-[160px] h-[160px] bg-gray rounded-full">
                        {imageURL && <Avatar url={imageURL} />}
                    </div>
                    <div className="my-2"><Button color="blue" onClick={() => setIsEditing(true)}>Alterar Imagem</Button></div>
                </div>
            ) : (
                <FormProvider {...editImageForm}>
                    <form onSubmit={handleSubmit((editImageFormData: EditImageFormData) => onSubmission(editImageFormData.imageURL, () => {
                        reset();
                        setIsEditing(false);
                    }))}>
                        <div className="p-1">
                            <TextField
                                type="text"
                                label="URL da Imagem de Perfil"
                                name="imageURL"
                            />
                            {errors.imageURL && <span className="text-xs text-red mt-1">{errors.imageURL.message}</span>}
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
            )}
        </div>
    )
}