"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

// Validation schema for product data
const productValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name cannot be empty" })
    .max(255, { message: "Product name is too long" }),
  price: z.coerce
    .number()
    .nonnegative({ message: "Price cannot be negative" }),
  quantity: z.coerce
    .number()
    .int({ message: "Quantity must be a whole number" })
    .min(0, { message: "Quantity cannot be negative" }),
  sku: z.string().nullish(),
  lowStockAt: z.coerce
    .number()
    .int()
    .min(0, { message: "Low stock threshold must be positive" })
    .nullish(),
});

type ProductFormData = z.infer<typeof productValidationSchema>;

/**
 * Extract and validate product data from form submission
 */
function extractProductData(formData: FormData): ProductFormData {
  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || null,
    lowStockAt: formData.get("lowStockAt") || null,
  };

  const validationResult = productValidationSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(`Validation error: ${errorMessages}`);
  }

  return validationResult.data;
}

/**
 * Server action to remove a product from inventory
 */
export async function deleteProduct(formData: FormData) {
  const authenticatedUser = await getCurrentUser();
  const productId = String(formData.get("id") ?? "");

  if (!productId) {
    throw new Error("Product ID is required for deletion");
  }

  await prisma.product.deleteMany({
    where: {
      id: productId,
      userId: authenticatedUser.id,
    },
  });
}

/**
 * Server action to add a new product to inventory
 * Returns success status instead of redirecting to allow client-side handling
 */
export async function createProduct(formData: FormData) {
  const authenticatedUser = await getCurrentUser();
  const validatedData = extractProductData(formData);

  try {
    await prisma.product.create({
      data: {
        ...validatedData,
        userId: authenticatedUser.id,
      },
    });
    
    // Revalidate the inventory page cache
    revalidatePath("/inventory");
    
    return { success: true };
  } catch (error) {
    console.error("Product creation error:", error);
    throw new Error("Unable to create product. Please try again.");
  }
}