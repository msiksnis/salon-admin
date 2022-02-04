import { list } from "@keystone-6/core";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  image,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      treatments: relationship({ ref: "Treatment.user", many: true }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "treatments"],
      },
    },
  }),
  Treatment: list({
    ui: {
      listView: {
        initialColumns: ["name", "price", "category", "subcategory", "gender"],
      },
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      price: integer(),
      category: select({
        options: [
          { label: "Hands", value: "hands" },
          { label: "Feet", value: "feet" },
          { label: "Vaxing", value: "vaxing" },
          { label: "Microblading", value: "microblading" },
          { label: "Lashes and Brows", value: "lashes and brows" },
        ],
        defaultValue: "feet",
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "edit" },
        },
      }),
      subcategory: select({
        validation: { isRequired: true },
        options: [
          { label: "Hands Female", value: "hands female" },
          { label: "Hands Male", value: "hands male" },
          { label: "Feet Female", value: "feet female" },
          { label: "Feet Male", value: "feet male" },
          {
            label: "Vaxing - Combo Vaxing",
            value: "vaxing - combo vaxing",
          },
          {
            label: "Vaxing - Pregnant / Sensitive",
            value: "vaxing - pregnant / sensitive",
          },
          {
            label: "Vaxing - Face",
            value: "vaxing - face",
          },
          { label: "Microblading", value: "microblading" },
          { label: "Lashes", value: "lashes" },
          { label: "Brows", value: "brows" },
        ],
        ui: {
          displayMode: "select",
          createView: { fieldMode: "edit" },
        },
      }),
      shortDescription: text({
        ui: {
          displayMode: "input",
        },
      }),
      fullDescription: text({
        ui: {
          displayMode: "textarea",
        },
      }),
      gender: select({
        options: [
          { label: "Female only", value: "female only" },
          { label: "Male only", value: "male only" },
          { label: "Unisex", value: "unisex" },
        ],
        defaultValue: "female only",
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "edit" },
        },
      }),
      status: select({
        options: [
          { label: "Draft", value: "draft" },
          { label: "Available", value: "available" },
          { label: "Unavailable", value: "unavailable" },
        ],
        defaultValue: "available",
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "edit" },
        },
      }),
      promoted: select({
        options: [
          { label: "False", value: "false" },
          { label: "True", value: "true" },
        ],
        defaultValue: "false",
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "edit" },
        },
      }),
      user: relationship({ ref: "User.treatments", many: false }),
      photo: relationship({
        ref: "Image.treatment",
        ui: {
          displayMode: "cards",
          cardFields: ["image", "altText"],
          inlineCreate: { fields: ["image", "altText"] },
          inlineEdit: { fields: ["image", "altText"] },
        },
      }),
    },
  }),
  Image: list({
    fields: {
      image: image(),
      altText: text(),
      treatment: relationship({ ref: "Treatment.photo" }),
    },
  }),
};
