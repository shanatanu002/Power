"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Upload, X, Star, Plus, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

// ─── Constants ─────────────────────────────────────────────────────────────

const USAGE_TYPES = [
  { value: "RESIDENTIAL" as const, label: "Residential" },
  { value: "COMMERCIAL" as const, label: "Commercial" },
  { value: "INDUSTRIAL" as const, label: "Industrial" },
  { value: "INSTITUTIONAL" as const, label: "Institutional" },
] as const;

const GST_RATES = [0, 5, 12, 18, 28] as const;

type UsageTypeValue = "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL" | "INSTITUTIONAL";

// ─── Zod schema ────────────────────────────────────────────────────────────
// Optional numeric fields are kept as strings in the form so empty inputs
// produce "" rather than NaN; conversion happens in onSubmit.

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().max(200, "Max 200 characters").optional(),
  brandId: z.string().min(1, "Select a brand"),
  categoryId: z.string().min(1, "Select a category"),
  usageType: z
    .array(z.enum(["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "INSTITUTIONAL"]))
    .min(1, "Select at least one usage type"),
  price: z.coerce.number({ message: "Enter a valid price" }).positive("Price must be positive"),
  salePrice: z.string().optional(),
  gstRate: z.coerce.number().min(0).max(28),
  wattage: z.string().optional(),
  voltage: z.string().optional(),
  capacity: z.string().optional(),
  warranty: z.string().optional(),
  stock: z.coerce.number({ message: "Enter stock quantity" }).int().min(0, "Cannot be negative"),
  isAvailable: z.boolean(),
  isFeatured: z.boolean(),
  isNewArrival: z.boolean(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Types ──────────────────────────────────────────────────────────────────

interface UploadedImage {
  id?: string;
  url: string;
  publicId?: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface SpecRow {
  key: string;
  value: string;
}

export interface ProductFormInitialData {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  brandId: string;
  categoryId: string;
  usageType: string[];
  price: number;
  salePrice: number | null;
  gstRate: number;
  wattage: number | null;
  voltage: number | null;
  capacity: string | null;
  warranty: string | null;
  stock: number;
  specifications: Record<string, unknown> | null;
  isAvailable: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  images: { id: string; url: string; alt: string | null; isPrimary: boolean; sortOrder: number }[];
}

interface ProductFormProps {
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  initialData?: ProductFormInitialData | null;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ProductForm({ brands, categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Images state — separate from RHF as uploads are async
  const [images, setImages] = useState<UploadedImage[]>(
    () =>
      initialData?.images.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt ?? "",
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder,
      })) ?? []
  );
  const [uploading, setUploading] = useState(false);

  // Dynamic specifications key-value editor
  const [specs, setSpecs] = useState<SpecRow[]>(
    () =>
      initialData?.specifications
        ? Object.entries(initialData.specifications as Record<string, unknown>).map(
            ([key, value]) => ({ key, value: String(value) })
          )
        : []
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          shortDescription: initialData.shortDescription ?? "",
          brandId: initialData.brandId,
          categoryId: initialData.categoryId,
          usageType: initialData.usageType as UsageTypeValue[],
          price: initialData.price,
          salePrice: initialData.salePrice != null ? String(initialData.salePrice) : "",
          gstRate: initialData.gstRate,
          wattage: initialData.wattage != null ? String(initialData.wattage) : "",
          voltage: initialData.voltage != null ? String(initialData.voltage) : "",
          capacity: initialData.capacity ?? "",
          warranty: initialData.warranty ?? "",
          stock: initialData.stock,
          isAvailable: initialData.isAvailable,
          isFeatured: initialData.isFeatured,
          isNewArrival: initialData.isNewArrival,
          metaTitle: initialData.metaTitle ?? "",
          metaDescription: initialData.metaDescription ?? "",
        }
      : {
          gstRate: 12,
          stock: 0,
          isAvailable: true,
          isFeatured: false,
          isNewArrival: false,
          usageType: [],
          salePrice: "",
          wattage: "",
          voltage: "",
        },
  });

  // ── Image upload ──────────────────────────────────────────────────────────

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (!files.length) return;

      setUploading(true);
      try {
        for (const file of files) {
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          const data = await res.json();
          if (data.success) {
            setImages((prev) => [
              ...prev,
              {
                url: data.url,
                publicId: data.publicId,
                alt: file.name.replace(/\.[^/.]+$/, ""),
                isPrimary: prev.length === 0,
                sortOrder: prev.length,
              },
            ]);
          } else {
            toast({ type: "error", title: `Failed to upload ${file.name}`, description: data.error });
          }
        }
      } catch {
        toast({ type: "error", title: "Upload failed" });
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    },
    []
  );

  const removeImage = (idx: number) => {
    setImages((prev) =>
      prev
        .filter((_, i) => i !== idx)
        .map((img, i) => ({ ...img, sortOrder: i, isPrimary: i === 0 ? prev[0].isPrimary || i === 0 : img.isPrimary }))
        // Ensure at least one primary after removal
        .map((img, i, arr) => ({
          ...img,
          isPrimary: arr.some((x) => x.isPrimary) ? img.isPrimary : i === 0,
        }))
    );
  };

  const setPrimaryImage = (idx: number) => {
    setImages((prev) => prev.map((img, i) => ({ ...img, isPrimary: i === idx })));
  };

  const updateImageAlt = (idx: number, alt: string) => {
    setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, alt } : img)));
  };

  // ── Form submit ───────────────────────────────────────────────────────────

  const onSubmit = async (data: FormValues) => {
    const payload = {
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription || null,
      brandId: data.brandId,
      categoryId: data.categoryId,
      usageType: data.usageType,
      price: data.price,
      salePrice: data.salePrice && data.salePrice !== "" ? parseFloat(data.salePrice) : null,
      gstRate: data.gstRate,
      wattage: data.wattage && data.wattage !== "" ? parseInt(data.wattage, 10) : null,
      voltage: data.voltage && data.voltage !== "" ? parseInt(data.voltage, 10) : null,
      capacity: data.capacity || null,
      warranty: data.warranty || null,
      stock: data.stock,
      specifications:
        specs.filter((s) => s.key.trim()).length > 0
          ? Object.fromEntries(
              specs.filter((s) => s.key.trim()).map(({ key, value }) => [key.trim(), value])
            )
          : null,
      isAvailable: data.isAvailable,
      isFeatured: data.isFeatured,
      isNewArrival: data.isNewArrival,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      images: images.map((img, i) => ({
        url: img.url,
        alt: img.alt,
        isPrimary: img.isPrimary,
        sortOrder: i,
      })),
    };

    try {
      const url = isEdit ? `/api/products/${initialData!.slug}` : "/api/products";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to save product");

      toast({ type: "success", title: isEdit ? "Product updated successfully" : "Product created successfully" });
      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      toast({ type: "error", title: message });
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  const FieldError = ({ msg }: { msg: string | undefined }) =>
    msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

  const Toggle = ({ name }: { name: "isAvailable" | "isFeatured" | "isNewArrival" }) => (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
            value ? "bg-amber-500" : "bg-slate-200"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200",
              value ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      )}
    />
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── LEFT / MAIN COLUMN ───────────────────────────────────────── */}
        <div className="xl:col-span-2 space-y-6">

          {/* Basic Info */}
          <Card>
            <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <Input placeholder="e.g. Adani 400W Mono PERC Solar Panel" {...register("name")} />
                <FieldError msg={errors.name?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description</label>
                <Input
                  placeholder="Brief one-line description (max 200 chars)"
                  {...register("shortDescription")}
                />
                <FieldError msg={errors.shortDescription?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Detailed product description..."
                  rows={5}
                  {...register("description")}
                  className="resize-y"
                />
                <FieldError msg={errors.description?.message} />
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card>
            <CardHeader><CardTitle className="text-base">Classification</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="brandId"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((b) => (
                            <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError msg={errors.brandId?.message} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError msg={errors.categoryId?.message} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Usage Type <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="usageType"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="flex flex-wrap gap-2">
                      {USAGE_TYPES.map(({ value: v, label }) => {
                        const checked = value.includes(v);
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() =>
                              onChange(checked ? value.filter((x) => x !== v) : [...value, v])
                            }
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all",
                              checked
                                ? "bg-amber-500 text-white border-amber-500"
                                : "bg-white text-slate-600 border-slate-300 hover:border-amber-400"
                            )}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                {(errors.usageType as { message?: string } | undefined)?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {(errors.usageType as { message?: string }).message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader><CardTitle className="text-base">Pricing</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <Input type="number" step="0.01" min="0" placeholder="12500" {...register("price")} />
                  <FieldError msg={errors.price?.message} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Sale Price (₹)</label>
                  <Input type="number" step="0.01" min="0" placeholder="10800" {...register("salePrice")} />
                  <FieldError msg={errors.salePrice?.message} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    GST Rate <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="gstRate"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={String(field.value ?? 12)}
                        onValueChange={(v) => field.onChange(parseFloat(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GST_RATES.map((r) => (
                            <SelectItem key={r} value={String(r)}>{r}%</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError msg={errors.gstRate?.message} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specs */}
          <Card>
            <CardHeader><CardTitle className="text-base">Technical Details</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Wattage (W)</label>
                  <Input type="number" min="1" placeholder="400" {...register("wattage")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Voltage (V)</label>
                  <Input type="number" min="1" placeholder="24" {...register("voltage")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Capacity</label>
                  <Input placeholder="e.g. 200Ah, 5kWh" {...register("capacity")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Warranty</label>
                  <Input placeholder="e.g. 25 years performance" {...register("warranty")} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Specifications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Additional Specifications</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSpecs((p) => [...p, { key: "", value: "" }])}
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Row
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {specs.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-3">
                  No specifications added. Click "Add Row" to begin.
                </p>
              )}
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder="Key (e.g. Efficiency)"
                    value={spec.key}
                    onChange={(e) =>
                      setSpecs((p) => p.map((s, idx) => (idx === i ? { ...s, key: e.target.value } : s)))
                    }
                    className="flex-1"
                  />
                  <Input
                    placeholder="Value (e.g. 21.5%)"
                    value={spec.value}
                    onChange={(e) =>
                      setSpecs((p) => p.map((s, idx) => (idx === i ? { ...s, value: e.target.value } : s)))
                    }
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setSpecs((p) => p.filter((_, idx) => idx !== i))}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove row"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader><CardTitle className="text-base">SEO (Optional)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Title</label>
                <Input
                  placeholder="SEO title (defaults to product name if empty)"
                  {...register("metaTitle")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                <Textarea
                  placeholder="SEO description (150–160 characters ideal)"
                  rows={2}
                  {...register("metaDescription")}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT / SIDEBAR COLUMN ───────────────────────────────────── */}
        <div className="space-y-6">

          {/* Images */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-amber-400 hover:bg-amber-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
                ) : (
                  <Upload className="w-6 h-6 text-slate-400" />
                )}
                <span className="text-sm font-medium text-slate-600">
                  {uploading ? "Uploading…" : "Click to upload images"}
                </span>
                <span className="text-xs text-slate-400">PNG, JPG, WebP — max 10 MB each</span>
              </button>

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || "Product"}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                      {img.isPrimary && (
                        <div className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                          Primary
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {!img.isPrimary && (
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(idx)}
                            className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-400"
                            title="Set as primary"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-400"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Alt text input */}
                      <div className="absolute bottom-0 inset-x-0 bg-white/90 px-1.5 py-1">
                        <input
                          type="text"
                          value={img.alt}
                          onChange={(e) => updateImageAlt(idx, e.target.value)}
                          placeholder="Alt text…"
                          className="w-full text-[11px] bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inventory & Status */}
          <Card>
            <CardHeader><CardTitle className="text-base">Inventory & Status</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <Input type="number" min="0" placeholder="0" {...register("stock")} />
                <FieldError msg={errors.stock?.message} />
              </div>

              {(
                [
                  { name: "isAvailable", label: "Available for sale" },
                  { name: "isFeatured", label: "Featured product" },
                  { name: "isNewArrival", label: "New arrival" },
                ] as const
              ).map(({ name, label }) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                  <Toggle name={name} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit row */}
      <div className="flex items-center gap-3 pt-2 pb-8">
        <Button
          type="submit"
          variant="solar"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting || uploading}
        >
          <Save className="w-4 h-4" />
          {isEdit ? "Save Changes" : "Create Product"}
        </Button>
        <Link href="/admin/products">
          <Button type="button" variant="outline" size="lg">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
