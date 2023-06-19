import Image from 'next/image'

type AvatarProps = {
    url: string;
}

export default function Avatar({ url }: AvatarProps) {
    return (
        <div className="w-full h-full rounded-full">
            <Image src={url} className="object-cover w-full h-full rounded-full" alt="avatar" />
        </div>
    )
}