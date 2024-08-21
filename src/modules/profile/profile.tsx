import { UpdateProfile } from "./update-profile";

export function MyProfile() {
  return (
    <>
      <div className="bg-white shadow min-w-[32rem] max-w-[32rem] border p-6 space-y-8">
        {/* Heading */}
        <div className="">
          <h4 className="text-2xl font-medium">My Profile</h4>
          <p className="text-base font-light text-gray-500">
            Below are your details and you can update them
          </p>
        </div>

        {/* Profile Form */}
        <UpdateProfile />
      </div>
    </>
  );
}
