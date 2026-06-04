/** Rutas del backend bajo `/api/v1`. */
export const apiEndpoints = {
  health: "/api/v1/health",
  auth: {
    login: "/api/v1/auth/login",
    me: "/api/v1/auth/me",
  },
  site: {
    contact: "/api/v1/site/contact",
    adminContact: "/api/v1/admin/site/contact",
  },
  sliders: {
    public: "/api/v1/sliders",
    admin: "/api/v1/admin/sliders",
    adminUpload: "/api/v1/admin/sliders/upload/image",
  },
  categories: {
    public: "/api/v1/categories",
    admin: "/api/v1/admin/categories",
    adminUpload: "/api/v1/admin/categories/upload/image",
  },
  products: {
    public: "/api/v1/products",
    featured: "/api/v1/products/featured",
    admin: "/api/v1/admin/products",
    adminUpload: "/api/v1/admin/products/upload/images",
  },
  quotes: {
    public: "/api/v1/quotes",
    admin: "/api/v1/admin/quotes",
  },
  wholesale: {
    public: "/api/v1/wholesale",
    admin: "/api/v1/admin/wholesale",
  },
  services: {
    public: "/api/v1/services",
    admin: "/api/v1/admin/services",
    adminUpload: "/api/v1/admin/services/upload/image",
  },
  search: {
    public: "/api/v1/search",
  },
} as const;
