import Sidebar from "@/component/SideBar";
import AddProductForm from "@/component/AddProductForm";
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";

export default async function AddProductPage() {
  await getCurrentUser();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentPath="/add-product" />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto lg:ml-0 mt-16 lg:mt-0">
        {/* Page Header */}
        <header className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Fill in the details below to add a new item to your inventory system
          </p>
        </header>

        {/* Form Component */}
        <AddProductForm createProductAction={createProduct} />
      </main>
    </div>
  );
}