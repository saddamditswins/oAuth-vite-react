import LoadingPage from "@/components/loading";
import { useUser } from "@/hooks/use-user";
import { uploadDoc } from "@/repo/doc";
import { getUser } from "@/repo/user";
import { useEffect, useState } from "react";

export function MyProfile() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);

    const getUserDetails = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userDetails = await getUser(user._id);
        if (!userDetails.error) {
          setUser(userDetails.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    try {
      if (e.target.files && e.target.files.length > 0) {
        const res = await uploadDoc(e.target.files[0], "Doc");
        console.log("e.target.files", res);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-white shadow min-w-[32rem] border p-6 space-y-8">
        {/* Heading */}
        <div className="">
          <h4 className="text-2xl font-medium">My Profile</h4>
          <p className="text-base font-light text-gray-500">
            Here are the details of user
          </p>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-2">
          <p className="text-md font-semibold">User Name</p>
          <p>
            {user?.firstname} {user?.lastname}
          </p>
          <p className="text-md font-semibold">Email</p>
          <p className="text-md ">{user?.email}</p>
        </div>

        <button
          className="p-2 border rounded-md bg-blue-600 text-white"
          type="submit"
        >
          Update Profile
        </button>

        <div className="">
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </div>
      </div>
    </>
  );
}
