import { setupWorker, rest } from "msw";
import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  user: {
    id: primaryKey(Number),
    email: String,
    additional_data: Array,
  },
});

db.user.create({
  id: 1,
  email: "hello@example.com",
  additional_data: [
    {
      key: "hobby",
      value: "code",
    },
    {
      key: "phone",
      value: "12345",
    },
  ],
});

export const worker = setupWorker(
  rest.get("*/users", (req, res, ctx) => res(ctx.json(db.user.getAll())))
);
