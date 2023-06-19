type AvatarProps = {
    url: string;
}

export default function Avatar({ url }: AvatarProps) {
    return (
        <div className="w-full h-full rounded-full">
            <img src={url} className="object-cover w-full h-full rounded-full" />
        </div>
    )
}