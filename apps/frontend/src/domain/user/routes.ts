export const userRoutes = {
  all: { path: "/users", href: () => "/users" },
  one: { path: "/users/:id", href: (id: string) => "/users/" + id },
};
