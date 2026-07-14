import { useState, useRef } from "react";
import { Upload, Trash2, ImageOff, Star } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { resolveImageUrl } from "../../utils/helpers";

export default function PhotoManagerModal({
  isOpen,
  onClose,
  title,
  photos,
  loading,
  onUpload,
  onDelete,
  isUploading,
  deletingId,
  allowUpload = true,
}) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  function handleFileSelect(e) {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  }

  async function handleUploadClick() {
    if (selectedFiles.length === 0) return;
    await onUpload(selectedFiles);
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      {allowUpload && (
        <div className="mb-5 p-4 border-2 border-dashed border-gray-200 rounded-xl">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="block w-full text-sm text-navy file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-navy file:text-white file:text-sm file:font-semibold hover:file:bg-navy-light file:cursor-pointer cursor-pointer"
          />
          {selectedFiles.length > 0 && (
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted">
                {selectedFiles.length} file(s) selected
              </p>
              <Button
                size="sm"
                variant="primary"
                icon={Upload}
                isLoading={isUploading}
                onClick={handleUploadClick}
              >
                Upload
              </Button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner size={28} className="text-navy" />
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-10">
          <ImageOff className="text-gray-300 mx-auto mb-2" size={32} />
          <p className="text-muted text-sm">No photos uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group rounded-lg overflow-hidden border border-gray-100 aspect-square bg-soft"
            >
              <img
                src={resolveImageUrl(photo.filePath)}
                alt=""
                className="w-full h-full object-cover"
              />
              {photo.isPrimary && (
                <span className="absolute top-1.5 left-1.5 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} fill="currentColor" />
                  Primary
                </span>
              )}
              <button
                onClick={() => onDelete(photo.id)}
                disabled={deletingId === photo.id}
                className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {deletingId === photo.id ? (
                  <Spinner size={20} className="text-white" />
                ) : (
                  <Trash2 className="text-white" size={20} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}