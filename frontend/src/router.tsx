import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductsPage } from "./pages/products/ProductsPage";
import { ProductFormPage } from "./pages/products/ProductFormPage";
import { RawMaterialsPage } from "./pages/raw-materials/RawMaterialsPage";
import { RawMaterialFormPage } from "./pages/raw-materials/RawMaterialFormPage";
import { ProductionCapacityPage } from "./pages/production-capacity/ProductionCapacityPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // Products
      { path: "products", element: <ProductsPage /> },
      { path: "products/create", element: <ProductFormPage mode="create" /> },
      { path: "products/:id/edit", element: <ProductFormPage mode="edit" /> },

      // Raw-Materials
      { path: "raw-materials", element: <RawMaterialsPage /> },
      { path: "raw-materials/create", element: <RawMaterialFormPage mode="create" /> },
      { path: "raw-materials/:id/edit", element: <RawMaterialFormPage mode="edit" /> },

      { path: "production-capacity", element: <ProductionCapacityPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
