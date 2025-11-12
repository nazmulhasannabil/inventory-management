import Sidebar from "@/component/SideBar";
import Pagination from "@/component/pagination";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Page props type definition for search parameters
type InventoryPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

// Configuration constants
const ITEMS_PER_PAGE = 8;
const DEFAULT_PAGE = 1;

// Table column headers configuration
const TABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "sku", label: "SKU" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Quantity" },
  { key: "lowStockAt", label: "Low Stock At" },
  { key: "actions", label: "Actions" },
] as const;

export default async function InventoryPage({
  searchParams,
}: InventoryPageProps) {
  // Fetch authenticated user
  const authenticatedUser = await getCurrentUser();
  const currentUserId = authenticatedUser.id;

  // Parse and sanitize search parameters
  const resolvedParams = await searchParams;
  const searchQuery = (resolvedParams.q ?? "").trim();
  const currentPage = Math.max(DEFAULT_PAGE, Number(resolvedParams.page ?? DEFAULT_PAGE));

  // Build database query filters
  const queryFilters = {
    userId: currentUserId,
    ...(searchQuery && { name: { contains: searchQuery, mode: "insensitive" as const } }),
  };

  // Fetch total count and paginated products concurrently
  const [productCount, productsList] = await Promise.all([
    prisma.product.count({ where: queryFilters }),
    prisma.product.findMany({
      where: queryFilters,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
  ]);

  // Calculate total pages for pagination
  const paginationPages = Math.max(1, Math.ceil(productCount / ITEMS_PER_PAGE));

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentPath="/products" />
      
      <main className="flex-1 p-6 mt-16 lg:mt-0 overflow-y-auto">
        {/* Page header section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Products
              </h1>
              <p className="text-sm text-gray-500">
                Manage your products and track inventory levels.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search bar section */}
          <div className="bg-white rounded-lg border-0 border-gray-200 ">
            <form className="flex gap-2" action="/products" method="GET">
              <input
                name="q"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
              />
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Search
              </button>
            </form>
          </div>

          {/* Products data table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              {/* Table header */}
              <thead className="bg-gray-50">
                <tr>
                  {TABLE_COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table body with product rows */}
              <tbody className="bg-white divide-y divide-gray-200">
                {productsList.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* Product name */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.name}
                    </td>
                    
                    {/* SKU code */}
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {item.sku || "-"}
                    </td>
                    
                    {/* Price with currency formatting */}
                    <td className="px-6 py-4  text-sm text-gray-900">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    
                    {/* Stock quantity */}
                    <td className="px-6 py-4  text-sm text-gray-900">
                      {item.quantity}
                    </td>
                    
                    {/* Low stock threshold */}
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {item.lowStockAt || "-"}
                    </td>
                    
                    {/* Action buttons */}
                    <td className="px-6 py-4  text-sm text-gray-500">
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                          await deleteProduct(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={item.id} />
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls - only shown when multiple pages exist */}
          {paginationPages > 1 && (
            <div className="bg-white rounded-lg border-0 border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={paginationPages}
                baseUrl="/products"
                searchParams={{
                  q: searchQuery,
                  pageSize: String(ITEMS_PER_PAGE),
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}