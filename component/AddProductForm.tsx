"use client";

import { useRef } from "react";
import Link from "next/link";
import { FiPackage, FiDollarSign, FiHash, FiAlertCircle } from "react-icons/fi";
import Swal from "sweetalert2";

// Form fields configuration
const FORM_FIELDS = [
  {
    id: "name",
    label: "Product Name",
    type: "text",
    required: true,
    placeholder: "e.g., Wireless Mouse",
    icon: FiPackage,
    gridSpan: "col-span-2",
    min: undefined,
    step: undefined,
  },
  {
    id: "quantity",
    label: "Stock Quantity",
    type: "number",
    required: true,
    placeholder: "0",
    min: "0",
    step: undefined,
    icon: FiHash,
    gridSpan: "col-span-1",
  },
  {
    id: "price",
    label: "Unit Price",
    type: "number",
    required: true,
    placeholder: "0.00",
    min: "0",
    step: "0.01",
    icon: FiDollarSign,
    gridSpan: "col-span-1",
  },
  {
    id: "sku",
    label: "SKU Code",
    type: "text",
    required: false,
    placeholder: "Optional stock keeping unit",
    icon: FiHash,
    gridSpan: "col-span-1",
    min: undefined,
    step: undefined,
  },
  {
    id: "lowStockAt",
    label: "Low Stock Alert Threshold",
    type: "number",
    required: false,
    placeholder: "Alert when stock falls below this number",
    min: "0",
    step: undefined,
    icon: FiAlertCircle,
    gridSpan: "col-span-1",
  },
] as const;

type AddProductFormProps = {
  createProductAction: (formData: FormData) => Promise<{ success: boolean }>;
};

export default function AddProductForm({ createProductAction }: AddProductFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // Handle form submission with sweet alert
  const handleSubmit = async (formData: FormData) => {
    try {
      await createProductAction(formData);
      
      // Show success alert
      await Swal.fire({
        title: "Success!",
        text: "Product has been added successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#9333ea",
        timer: 3000,
        timerProgressBar: true,
      });

      // Reset form after success
      formRef.current?.reset();
    } catch (error) {
      // Show error alert
      await Swal.fire({
        title: "Error!",
        text: "Failed to add product. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        {/* Form header */}
        <div className="bg-linear-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Product Information
          </h2>
          <p className="text-purple-400 text-sm mt-1">
            Fields marked with * are required
          </p>
        </div>

        {/* Form content */}
        <form ref={formRef} action={handleSubmit} className="p-8">
          <div className="grid grid-cols-2 gap-6">
            {FORM_FIELDS.map((field) => {
              const IconComponent = field.icon;
              return (
                <div key={field.id} className={field.gridSpan}>
                  <label
                    htmlFor={field.id}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <IconComponent className="text-purple-600" />
                    {field.label}
                    {field.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    required={field.required}
                    placeholder={field.placeholder}
                    min={field.min}
                    step={field.step}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-8 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Save Product
            </button>
            <Link
              href="/dashboard"
              className="flex-1 px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
