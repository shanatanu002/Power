export type UserRole = "ADMIN" | "CUSTOMER" | "DEALER";
export type UsageType = "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL" | "INSTITUTIONAL";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type InquiryType = "GENERAL" | "PRODUCT" | "QUOTE" | "INSTALLATION" | "CONSULTATION" | "COMPLAINT";
export type InquiryStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku?: string;
  brand: Brand;
  category: Category;
  usageType: UsageType[];
  price: number;
  salePrice?: number;
  gstRate: number;
  specifications?: Record<string, string>;
  wattage?: number;
  voltage?: number;
  capacity?: string;
  warranty?: string;
  images: ProductImage[];
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  gstAmount: number;
  shippingAmount: number;
  totalAmount: number;
  items: OrderItem[];
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  type: InquiryType;
  status: InquiryStatus;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  role?: string;
  avatar?: string;
  rating: number;
  content: string;
  isVerified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorName?: string;
  status: PostStatus;
  publishedAt?: Date;
  readTime?: number;
  tags?: { name: string; slug: string }[];
  createdAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
