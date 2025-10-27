'use client';
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  role: string;
};

export default function FormsPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Create User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input {...register("name")} className="border p-2 w-full rounded" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input {...register("email")} className="border p-2 w-full rounded" />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select {...register("role")} className="border p-2 w-full rounded">
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
