import FileManager from "@/components/file-manager";

export function FileManagerPage() {
  return (
    <>
      <div className="bg-white shadow min-w-[32rem] border p-6 space-y-8">
        {/* Heading */}
        <div className="">
          <h4 className="text-2xl font-medium">File Manager</h4>
          <FileManager />
        </div>
      </div>
    </>
  );
}
