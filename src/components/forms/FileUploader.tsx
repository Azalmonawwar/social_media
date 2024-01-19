"use client"
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";


const FileUploader = ({fieldChange}:any) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result);
      fieldChange(file.result)
    }
    file.readAsDataURL(acceptedFiles[0])
  }, [])
  
  

  const { getRootProps, getInputProps  , isDragActive} = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center flex-col bg-gray-800 py-2  rounded-xl cursor-pointer w-full">
      <input {...getInputProps()} className="cursor-pointer" />

      {preview ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={preview as string} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className=" flex flex-col items-center justify-center">
          <img
            src="/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
            
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
      
    </div>
  );
};

export default FileUploader;