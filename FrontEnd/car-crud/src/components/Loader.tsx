import Image from "next/image"

export default function Loader() {
  return (
    <div className="flex absolute top-0 bg-white justify-center items-center h-full w-full">
      <Image
        src="/loader.svg"
        alt="Loading..."
        width={50}
        height={50}
        className="animate-spin"
      />
    </div>
  )
}