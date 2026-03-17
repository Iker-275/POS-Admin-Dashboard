import ComponentCard from "../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useCustomerBulkUpload } from "../../hooks/useCustomerBulkUpload";

const BulkUploadCustomers: React.FC = () => {

  const { upload, uploading } = useCustomerBulkUpload();

  const [message, setMessage] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {

    if (!acceptedFiles.length) return;

    const file = acceptedFiles[0];

    try {

      setMessage(null);

      await upload(file);

      setMessage("Customers uploaded successfully.");

    } catch (err: any) {

      setMessage(err.message || "Upload failed");

    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({

    onDrop,

    maxFiles: 1,

    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": []
    }

  });

  return (

    <ComponentCard title="Bulk Upload Customers">

      <div className="transition border border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-brand-500">

        <form
          {...getRootProps()}
          className={`rounded-xl border-dashed border-gray-300 p-7 lg:p-10
          ${
            isDragActive
              ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
              : "border-gray-300 bg-gray-50 dark:bg-gray-900"
          }`}
        >

          <input {...getInputProps()} />

          <div className="flex flex-col items-center text-center">

            <div className="mb-4 text-4xl">📊</div>

            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">

              {isDragActive
                ? "Drop Excel File Here"
                : "Upload Customers Excel File"}

            </h4>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">

              <p>Accepted format: <b>.xlsx</b></p>

              <p>File name: <b>customers.xlsx</b></p>

              <p>Sheet name: <b>customers</b></p>

            </div>

            <span className="mt-5 font-medium underline text-theme-sm text-brand-500">
              Browse Excel File
            </span>

            {uploading && (
              <p className="mt-4 text-blue-500">
                Uploading customers...
              </p>
            )}

            {message && (
              <p className="mt-4 text-green-600">
                {message}
              </p>
            )}

          </div>

        </form>

      </div>

    </ComponentCard>
  );
};

export default BulkUploadCustomers;