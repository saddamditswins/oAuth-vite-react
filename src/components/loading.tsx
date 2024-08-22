export default function LoadingPage({text}: {text?: string}) {
  return (
    <div className="h-full flex justify-center items-center gap-4">
      <div className="h-10 w-10 rounded-full border-2 border-t-blue-500 animate-spin" />
      <p className="text-lg text-blue-600">{text || "Loading"}</p>
    </div>
  );
}
