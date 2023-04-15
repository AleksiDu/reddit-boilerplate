import { EntitySchema } from "@mikro-orm/core/metadata";

export class Post {
  id!: number;
  title!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export const schema = new EntitySchema<Post>({
  class: Post,
  properties: {
    id: { type: "number", primary: true },
    title: { type: "string" },
    createdAt: { type: "Date", onCreate: () => new Date(), nullable: true },
    updatedAt: {
      type: "Date",
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
      nullable: true,
    },
  },
});
