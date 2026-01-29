import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { MATERIALS_SANITY_LIST, COLORS_SANITY_LIST } from "@/lib/constants/filters";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory" },
    { name: "promotion", title: "Promotion & Badges" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "details",
      validation: (rule) => [rule.required().error("Product name is required")],
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "details",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => [
        rule.required().error("Slug is required for URL generation"),
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      group: "details",
      rows: 4,
      description: "Product description",
    }),
    defineField({
      name: "price",
      type: "number",
      group: "details",
      description: "Price in TSh (e.g., 550000)",
      validation: (rule) => [
        rule.required().error("Price is required"),
        rule.positive().error("Price must be a positive number"),
      ],
    }),
    defineField({
      name: "discountPercentage",
      title: "Discount Percentage",
      type: "number",
      group: "promotion",
      description: "Percentage discount to display (0-100)",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "isExpress",
      title: "Express Delivery",
      type: "boolean",
      group: "promotion",
      initialValue: false,
      description: "Enable 'Now Express' badge for Dar es Salaam delivery",
    }),
    defineField({
      name: "isBestseller",
      title: "Bestseller Status",
      type: "boolean",
      group: "promotion",
      initialValue: false,
      description: "Enable 'Bestseller' indicator",
    }),
    defineField({
      name: "clubPoints",
      title: "Club Points Awarded",
      type: "number",
      group: "promotion",
      initialValue: 0,
      description: "Points earned when purchasing this product",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (rule) => [rule.required().error("Category is required")],
    }),
    defineField({
      name: "brand",
      type: "reference",
      to: [{ type: "brand" }],
      group: "details",
    }),
    defineField({
      name: "material",
      type: "string",
      group: "details",
      options: {
        list: MATERIALS_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "color",
      type: "string",
      group: "details",
      options: {
        list: COLORS_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "dimensions",
      type: "string",
      group: "details",
      description: 'e.g., "120cm x 80cm x 75cm"',
    }),
    defineField({
      name: "images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => [
        rule.min(1).error("At least one image is required"),
      ],
    }),
    defineField({
      name: "stock",
      type: "number",
      group: "inventory",
      initialValue: 0,
      description: "Number of items in stock",
      validation: (rule) => [
        rule.min(0).error("Stock cannot be negative"),
        rule.integer().error("Stock must be a whole number"),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "inventory",
      initialValue: false,
      description: "Show on homepage and promotions",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
      description: "Bullet points for the product features",
    }),
    defineField({
      name: "specifications",
      title: "Technical Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
      group: "details",
    }),
    defineField({
      name: "faqs",
      title: "Product FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text" },
          ],
        },
      ],
      group: "details",
    }),
    defineField({
      name: "condition",
      title: "Product Condition",
      type: "string",
      options: {
        list: [
          { title: "Brand New", value: "new" },
          { title: "Refurbished - Excellent", value: "excellent" },
          { title: "Refurbished - Good", value: "good" },
        ],
        layout: "radio",
      },
      initialValue: "new",
      group: "details",
    }),
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      group: "inventory",
      description: "Define variant options like Color, Size, Storage",
      of: [
        {
          type: "object",
          title: "Variant Option",
          fields: [
            {
              name: "name",
              title: "Option Name",
              type: "string",
              description: "e.g., Color, Size, Storage",
              validation: (rule) => rule.required(),
            },
            {
              name: "values",
              title: "Option Values",
              type: "array",
              of: [{ type: "string" }],
              description: "e.g., Red, Blue, 128GB, 256GB",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "skus",
      title: "SKU Matrix",
      type: "array",
      group: "inventory",
      description: "Specific stock keeping units for variant combinations",
      of: [
        {
          type: "object",
          title: "SKU",
          fields: [
            {
              name: "code",
              title: "SKU Code / Combination",
              type: "string",
              description: "e.g. Color:Red|Storage:128GB",
              validation: (rule) => rule.required(),
            },
            {
              name: "price",
              title: "Price Override",
              type: "number",
              description: "Leave empty to use base price",
            },
            {
              name: "stock",
              title: "Stock Quantity",
              type: "number",
              initialValue: 0,
            },
            {
              name: "image",
              title: "Variant Image",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: "code",
              subtitle: "stock",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle: `${subtitle} in stock`,
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "isDigital",
      title: "Digital Product",
      type: "boolean",
      group: "details",
      initialValue: false,
      description: "Check if this is a downloadable product",
    }),
    defineField({
      name: "digitalFile",
      title: "Digital Asset",
      type: "file",
      group: "media",
      hidden: ({ document }) => !document?.isDigital,
      description: "Upload the digital file for this product",
    }),
    defineField({
      name: "assemblyRequired",
      type: "boolean",
      group: "inventory",
      initialValue: false,
      description: "Does this product require assembly?",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "images.0",
      price: "price",
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
        subtitle: `${subtitle ? subtitle + " • " : ""}$${price ?? 0}`,
        media,
      };
    },
  },
});
