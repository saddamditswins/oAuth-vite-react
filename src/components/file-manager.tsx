"use client";
import {
  FolderIcon,
  DocumentIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
type IID = number;
interface IFILES {
  id: IID;
  name: string;
  type: string;
  size: string;
  modified: string;
  showOptions?: boolean;
}
const allFiles: IFILES[] = [
  { id: 1, name: "Documents", type: "folder", size: "100 MB", modified: "2023-12-25" },
  { id: 2, name: "image1.png", type: "image", size: "2.5 MB", modified: "2024-01-10" },
  { id: 3, name: "report1.pdf", type: "pdf", size: "500 KB", modified: "2024-01-15" },
  { id: 4, name: "Music", type: "folder", size: "1 GB", modified: "2023-11-30" },
  { id: 5, name: "video1.mp4", type: "video", size: "700 MB", modified: "2024-02-01" },
  { id: 6, name: "image2.jpg", type: "image", size: "3 MB", modified: "2024-02-05" },
  { id: 7, name: "Presentation", type: "folder", size: "200 MB", modified: "2024-01-20" },
  { id: 8, name: "slide1.pptx", type: "ppt", size: "15 MB", modified: "2024-02-10" },
  { id: 9, name: "report2.pdf", type: "pdf", size: "800 KB", modified: "2024-02-15" },
  { id: 10, name: "image3.png", type: "image", size: "1 MB", modified: "2024-01-25" },
  { id: 11, name: "Work", type: "folder", size: "50 MB", modified: "2023-12-20" },
  { id: 12, name: "file1.docx", type: "doc", size: "4 MB", modified: "2024-01-01" },
  { id: 13, name: "report3.pdf", type: "pdf", size: "1.2 MB", modified: "2024-02-18" },
  { id: 14, name: "image4.jpg", type: "image", size: "2.7 MB", modified: "2024-01-30" },
  { id: 15, name: "Project", type: "folder", size: "500 MB", modified: "2023-11-15" },
  { id: 16, name: "video2.mov", type: "video", size: "900 MB", modified: "2024-02-11" },
  { id: 17, name: "image5.png", type: "image", size: "2.8 MB", modified: "2024-02-13" },
  { id: 18, name: "Design", type: "folder", size: "350 MB", modified: "2023-10-05" },
  { id: 19, name: "logo.ai", type: "vector", size: "8 MB", modified: "2024-02-20" },
  { id: 20, name: "report4.pdf", type: "pdf", size: "600 KB", modified: "2024-02-25" },
  { id: 21, name: "image6.jpg", type: "image", size: "4.5 MB", modified: "2024-01-12" },
  { id: 22, name: "Videos", type: "folder", size: "2 GB", modified: "2023-12-05" },
  { id: 23, name: "video3.mp4", type: "video", size: "1.2 GB", modified: "2024-02-18" },
  { id: 24, name: "image7.png", type: "image", size: "5 MB", modified: "2024-02-22" },
  { id: 25, name: "Notes", type: "folder", size: "20 MB", modified: "2023-11-28" },
  { id: 26, name: "note1.txt", type: "text", size: "500 KB", modified: "2024-02-07" },
  { id: 27, name: "report5.pdf", type: "pdf", size: "700 KB", modified: "2024-02-28" },
  { id: 28, name: "image8.jpg", type: "image", size: "3.2 MB", modified: "2024-01-18" },
  { id: 29, name: "Marketing", type: "folder", size: "120 MB", modified: "2023-10-25" },
  { id: 30, name: "brochure.pdf", type: "pdf", size: "3.5 MB", modified: "2024-02-19" },
  { id: 31, name: "image9.png", type: "image", size: "1.8 MB", modified: "2024-02-17" },
  { id: 32, name: "Finance", type: "folder", size: "75 MB", modified: "2023-12-18" },
  { id: 33, name: "spreadsheet1.xlsx", type: "spreadsheet", size: "5 MB", modified: "2024-02-14" },
  { id: 34, name: "report6.pdf", type: "pdf", size: "650 KB", modified: "2024-02-12" },
  { id: 35, name: "image10.jpg", type: "image", size: "2.3 MB", modified: "2024-02-16" },
  { id: 36, name: "Legal", type: "folder", size: "90 MB", modified: "2023-10-30" },
  { id: 37, name: "contract1.pdf", type: "pdf", size: "1 MB", modified: "2024-02-09" },
  { id: 38, name: "image11.png", type: "image", size: "3.6 MB", modified: "2024-02-03" },
  { id: 39, name: "Operations", type: "folder", size: "300 MB", modified: "2023-12-12" },
  { id: 40, name: "manual.pdf", type: "pdf", size: "1.8 MB", modified: "2024-02-26" },
  { id: 41, name: "image12.jpg", type: "image", size: "2.9 MB", modified: "2024-01-29" },
  { id: 42, name: "HR", type: "folder", size: "150 MB", modified: "2023-11-05" },
  { id: 43, name: "policy.pdf", type: "pdf", size: "850 KB", modified: "2024-02-08" },
  { id: 44, name: "image13.png", type: "image", size: "4.1 MB", modified: "2024-02-02" },
  { id: 45, name: "Admin", type: "folder", size: "60 MB", modified: "2023-12-02" },
  { id: 46, name: "logistics.pdf", type: "pdf", size: "550 KB", modified: "2024-02-06" },
  { id: 47, name: "image14.jpg", type: "image", size: "2 MB", modified: "2024-01-14" },
  { id: 48, name: "Tech", type: "folder", size: "400 MB", modified: "2023-11-25" },
  { id: 49, name: "specs.pdf", type: "pdf", size: "2.5 MB", modified: "2024-02-21" },
  { id: 50, name: "image15.png", type: "image", size: "3.4 MB", modified: "2024-02-04" },
];

const FileManager = () => {
  const [files, setFiles] = useState<IFILES[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const observerRef = useRef(null);

  // Load files based on page number
  useEffect(() => {
    const loadFiles = () => {
      const newFiles = allFiles.slice(0, page * itemsPerPage);
      setFiles(newFiles);
    };

    loadFiles();
  }, [page]);

  // Infinite scrolling logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && files.length < allFiles.length) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [files]);

  const handleOptionsClick = (id: IID) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, showOptions: !file.showOptions } : file,
      ),
    );
  };

  const handleRemove = (id: IID) => {
    console.log(`Remove file with id: ${id}`);
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {file.type === "folder" && <FolderIcon className="h-6 w-6 text-blue-500" />}
                {file.type === "image" && <DocumentIcon className="h-6 w-6 text-yellow-500" />}
                {file.type === "pdf" && <DocumentIcon className="h-6 w-6 text-red-500" />}
                <span className="ml-3 text-gray-700">{file.name}</span>
              </div>
              <button
                onClick={() => handleOptionsClick(file.id)}
                className="relative focus:outline-none"
              >
                <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
              </button>
              {file.showOptions && (
                <div className="absolute right-0 top-8 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={() => handleRemove(file.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-4">
              <p>Size: {file.size}</p>
              <p>Modified: {file.modified}</p>
            </div>
          </div>
        ))}
      </div>
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default FileManager;
