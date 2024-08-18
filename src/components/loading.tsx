export default function LoadingPage() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="h-12 w-12 rounded-full border-2 border-blue-500 animate-spin" />
      <p className="text-lg text-blue-600">Loading</p>
    </div>
  );
}
