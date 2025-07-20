import { createFileRoute } from "@tanstack/react-router";
import NavBar from "../../components/NavBar";
import { useForm } from "react-hook-form";
import { useProductStore } from "../../store/useProductStore";

export const Route = createFileRoute("/product/add")({
  component: ReactComponent,
});

function ReactComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addProduct } = useProductStore();

  const onSubmit = (data) => {
    //As we know from post man we have to give in form of FormData
    // const formData = new FormData();

    // formData.append("name", data.name);
    // formData.append("price", data.price);
    // formData.append("stock", data.stock);
    // formData.append("category", data.category);
    // formData.append("image", data.image[0]); // single file

    // // ✅ You can now send `formData` to your backend
    // console.log("FormData Ready:", formData);

    addProduct(data);
  };

  return (
    <div className="text-black min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block font-medium mb-1">Stock</label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image URL is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
