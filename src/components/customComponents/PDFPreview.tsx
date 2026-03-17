export default function PdfPreviewModal({ open, url, onClose }: any) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-[80%] h-[80%] p-4">

        <div className="flex justify-between mb-2">

          <h2 className="font-semibold">PDF Preview</h2>

          <button onClick={onClose}>Close</button>

        </div>

        <iframe
          src={url}
          className="w-full h-full border"
        />

      </div>

    </div>

  );
}