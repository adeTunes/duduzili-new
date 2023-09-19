# Duduzili Social Media Web App Documentation

## Introduction

Duduzili is a social media web application that allows users to connect, share posts, and interact with each other in a friendly and engaging environment. This documentation serves as a guide for developers taking over the project, providing a comprehensive overview of the frontend interface and its underlying technologies.

## Technologies Used

- **Javascript Library**: React
- **React Framework**: Next.js with Typescript
- **CSS Framework**: Tailwind CSS
- **State Manager**: Jotai
- **UI Library**: Mantine UI

## Environment Variables

The application relies on several environment variables to function correctly. Ensure that these variables are set up appropriately in the deployment environment:

1. `NEXT_PUBLIC_BASE_URL`: https://duduzili-staging-server.com.ng/ (Base URL for the application).
2. `NEXT_PUBLIC_API_KEY`: “p3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn2r5u8x/A?D(G+KaPdSg” API key for accessing backend services.
3. `NEXT_PUBLIC_HASH_KEY`: “bd3fdcd1a59e212a2703503bcc5acf8ca4ddda09ea8041dc47508bb1493b129c1f3dd1803e05070a00a7e913374ddcf60dbb187e395c60aef20550c9ab4d25a9" Hash key for specific purposes.
4. `NEXT_PUBLIC_REQUEST_TS`: "2023-04-22 00:26:46.411504+00:00" Timestamp used for API requests.
5. `NEXT_PUBLIC_SOCKET_URL`: wss://duduzili-staging-server.com.ng (Socket URL for real-time communication).
6. `NEXT_PUBLIC_SITE_URL`: https://duduzili.com (URL of the application).

## Authenticated Pages

- All pages require user authentication to access except:
  - Login
  - Signup
  - Home
  - Profile
  - Single post and comment
  - FAQ
  - About

## Server-Side Rendering

Duduzili utilizes server-side rendering for improved performance and SEO. All pages are server-rendered, but backend APIs are consumed on the client side except for the `profile` and `single post` pages that use `getServerSideProps` to fetch data on the server, enabling link previews when shared on social media platforms.

## Folder Structure

1. `pages`: Contains files and folders representing the pages rendered on the screen.
2. `public`: Holds all static files, such as images, with the name of each folder representing the page where the image is used.
3. `types`: Contains type declarations for the application's layout.
4. `hooks`: Holds all custom hooks used throughout the project.
5. `api`: Contains Axios configuration, request/response types, and all endpoints used in the project.
6. `utils`: Contains other helper functions, such as the notification handler.
7. `src`: Contains the following folders:
   - `components`: Contains reusable components used throughout the application. Subfolders inside this directory correspond to individual pages in the app, with files inside these subfolders representing components used on those pages.
   - `actions`: Represents user actions in the app, such as follow, post, share post, unfollow, etc.
   - `context`: Contains a single context used to broadcast logged-in user details across the application and handle authentication.
   - `helpers`: Contains certain JSON data, such as country data, and other helper functions.
   - `layout`: Contains files representing different layout components used in the application. Each layout component receives a `children` prop passed from the necessary pages using dot access on the page component, rather than wrapping the layout component around the page component directly.
   - `providers`: Contains all providers used in this project.
   - `store`: Contains a file that stores all states used in the project that cannot be handled by the React `useState` hook. This implementation is from the Jotai state manager. To use Jotai, import the Jotai Provider from the library after installing it and use it to wrap your root component. Then, create a file where you export your states/atoms.

## Other Packages

The list of other packages used in the application can be found in the `package.json` file.

## Conclusion

This documentation should serve as a helpful guide for any developer taking over the Duduzili social media web app project. It provides an overview of the frontend interface, the technologies used, the folder structure, and essential environment variables. For further details on specific components or functionalities, refer to the codebase and comments within the project files. Happy coding!