# Front-End-4B

## Setup

1. **Install dependencies**  
   Make sure you have [pnpm](https://pnpm.io/) installed.

   ```sh
   pnpm install
   ```

2. **Environment file**  
   Create a .env file in the project root:

3. **Update Proxy URL**  
    In `vite.config.ts`, update the `target` to point to your backend API:
   ```ts
   proxy: {
        "/api": {
          target: "https://api.example.com/api/v2",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          cookieDomainRewrite: "localhost",
          headers: proxyHeaders,
        },
      },
   ```

## Role Handling

- User roles (student, company, coordinator) are managed in route files (e.g., `routes/_company/route.tsx`).
- Each route checks authentication and role before rendering content.
- Unauthorized access triggers a redirect.

---

## Deep Linking & Broken States

- Deep linking is prevented by route guards in `route.tsx` files.
- If a user is not authenticated, they are redirected to `/login`.
- After login, users are redirected back to the page they originally tried to access.

---

## Development

- Start the dev server:
  ```sh
  pnpm run dev
  ```
- The app uses Vite for fast development and hot reloading.

---

## Folder Structure

- components: UI components.
- hooks: Custom hooks and form logic.
- lib: Utilities and proxy client.
- routes: Route definitions and guards.
- store: State management for authentication.
- types: Zod schemas and TypeScript types.

---

## Tech Stack

### Core Languages & Frameworks

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)

**TypeScript**: Type-safe JavaScript for scalable development.  
**React**: Component-based UI library.

### UI & Styling

![ShadCN](https://img.shields.io/badge/ShadCN-000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38b2ac?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-ff6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

**ShadCN**: Prebuilt UI components for fast development.  
**Tailwind CSS**: Utility-first CSS framework for custom styling.
**Chart.js**: Flexible JavaScript charting library for data visualization.

### Routing, Data & Forms

![TanStack Router](https://img.shields.io/badge/TanStack%20Router-ff4154?style=for-the-badge&logo=tanstack&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-ff4154?style=for-the-badge&logo=tanstack&logoColor=white)
![TanStack Form](https://img.shields.io/badge/TanStack%20Form-ff4154?style=for-the-badge&logo=tanstack&logoColor=white)

**TanStack Router**: Handles navigation and route protection.  
**TanStack Query**: Efficient data fetching and caching.  
**TanStack Form**: Form state and validation management.

### Validation & State

![Zod](https://img.shields.io/badge/Zod-3a3a3a?style=for-the-badge&logo=zod&logoColor=white)

![Zustand](https://img.shields.io/badge/zustand-602c3c?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAA8FBMVEVHcExXQzpKQDlFV16lpqyGh4tPPTdWT0weHRU7LRZGQzmxYjlaTkZsbmywVyxtXDSFhISXm6WWpcaytb6bm56gprY0LiiXmp2prLamsMa0XS42MSxkTUVDSkuyYzGihXdDV2GprbmedVxaRD1kTUWUdGFGOCN4a2OfpbI0SFFAMSddTkbCc0dWQiGFRypXQyJUQCBcTTWviDVXQyJcUDjlqCWxjkG+hBTiohtURD6lr8lORTtDVVZmPyxwSipaRSJDOzaWpsyYqMyYqM2dq8tPOjBERTs6QUKTcCeKaCJvViZdSDK4iSngoiDvqx7KkRuGEi1hAAAAOXRSTlMApZ78cB8hCAMQO/j/FOH4KlT1wFfJTjaY6SxtVexFn3Tn2sN6d671mVuJ+/PPN9CT6TfpS4C9jJaVLRihAAAAi0lEQVQIHXXBxRKCUAAF0Es/QMDubsVuGrv1///GBQ4bx3PwgwC8gFCRohs8QrQV0ZtKOZ9JcgBmU8MwqFa9kjNTUWB58f2jPOjU9juTBTbPq+vIar972MZjwPr1uDvqCFw2wQpQVm/t7Oo9gAgAFtrtZNtMFQFp7nkWU5IQECfjYbuQFvBFRJHgjw9L0A80UmaGpAAAAABJRU5ErkJggg==)

**Zod**: Type-safe schema validation for forms and API data.  
**Zustand**: Lightweight state management for Authentication and saving to local storage.

### Tooling

![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

**Prettier**: Code formatting for consistent style.
