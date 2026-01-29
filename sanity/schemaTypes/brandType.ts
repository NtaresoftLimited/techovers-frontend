import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const brandType = defineType({
    name: "brand",
    title: "Brand",
    type: "document",
    icon: ComponentIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "logo",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "website",
            type: "url",
        }),
    ],
});
