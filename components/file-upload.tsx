"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
	value: string;
	onChange: (url?: string) => void;
	endpoint: "messageFile" | "serverImage";
}

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

const FileUpload = ({ value, onChange, endpoint }: FileUploadProps) => {
	const fileType = value?.split(".").pop();

	if (value && fileType !== "pdf") {
		return (
			<div className="relative h-20 w-20">
				<Image fill src={value} alt="Upload" className="rounded-full" />

				<button
					onClick={() => onChange("")}
					className="bg-rose-500 text-white-1 p-1 rounded-full absolute top-0 right-0 shadow-sm"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		);
	}

	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].fileUrl);
			}}
			onUploadError={(error: Error) => {
				console.log(error);
			}}
		/>
	);
};

export default FileUpload;
