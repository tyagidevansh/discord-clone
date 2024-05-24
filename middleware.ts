// middleware.ts or src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/servers/:id*"
]);

export default clerkMiddleware((auth, req) => {
  console.log(`Middleware invoked for: ${req.url}`);
  if (isProtectedRoute(req)) {
    console.log("Protected route accessed");
    auth().protect();
  }
});
