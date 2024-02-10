import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import dotenv from 'dotenv'
// dotenv.config()


const PDFDropzone = (props) => {
  const notify = () => {
    toast.error("'Ensure that Uploaded document is a PDF", {
      position: "top-center",
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    props.onLoading(true);
    const formData = new FormData();
    formData.append("pdf_file", acceptedFiles[0]);
    // let data={
    //   pdf:acceptedFiles
    // }

    console.log(acceptedFiles[0]);
    const response = await fetch(import.meta.env.VITE_SERVER_URL+"upload-pdf/", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data.status);
    // console.log(data.image);
    props.onLoading(false);
    if (response.status == 201) {
      props.onSrcChange(data.image);
    }
    else{
      notify();
    }

    // const response = await axios.post('http://localhost:8000/getfile/', data);
    // console.log(response.data);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className="border-dashed border-white border-[5px] p-10 w-96 h-72 flex flex-col justify-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="text-gray-400">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default PDFDropzone;
