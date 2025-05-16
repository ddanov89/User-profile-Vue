# Vue Profile Page 

The current project is made using Vue 3. For data fetching it uses https://jsonplaceholder.typicode.com/ and its users resource that comprises of 10 users.

## Development Server

To start a local development server, run:

```bash
npm run dev
```

Once the server is running, open your browser and navigate to `http://localhost:5173/`. The application is set in such a way that when landing on `http://localhost:5173/`, it will redirect you to the profile page of a user with ID `1`.

## Application Routes

This Vue application includes multiple routes that allow users to view, edit, and manage user profiles. Below is a summary of the available routes and what actions users can take:

### `/` → Redirect to `/profile-page/1`
- **Purpose**: Acts as the default landing page.
- **Behavior**: Automatically redirects to the profile page of the user with ID `1`.

---

### `/profile-page/:userId`
- **Purpose**: Displays the profile details of a specific user.
- **Example**: `/profile-page/1`
- **Features**:
  - View user information (name, email, phone, address, etc.)
  - Display user avatar.
  - Option to navigate to the edit form.

---

### `/edit/:userId`
- **Purpose**: Edit the profile of a specific user.
- **Example**: `/edit/1`
- **Features**:
  - Form for updating user details (name, email, address, company, etc.)
  - Upload or change profile image.
  - Save changes to update application state and localStorage.

---

### `/404`
- **Purpose**: Custom "Not Found" error page.
- **Displayed when**:
  - A non-existent or invalid route is accessed.
  - A user ID is not found in the data source.

---

### `**` → Redirect to `/404`
- **Wildcard route**: Any unrecognized URL will redirect to the 404 error page.

---

These routes are designed to create a smooth experience for users navigating between profile viewing, editing, and error handling.

---

## State Management & Data Storage

This application uses a combination of **Pinta** for reactive state management and **LocalStorage** to simulate persistent data, due to backend limitations.

### State Management with Pinta

The app uses the [Pinia]https://pinia.vuejs.org/ library to manage user-related state in a predictable, scalable, and reactive way. It leverages:

- **Stores** – To dispatch events (e.g., `loadUsers`, `updateUser`)
- **State** – To update application state based on dispatched actions
- **Getters** – Serve as computed properties to derive and access specific slices of the state.
- **Actions** – Handle synchronous and asynchronous operations like fetching users from an API or updating a user profile.

This architecture allows for clean separation of concerns, better debugging, and a reactive UI.

---

### Why LocalStorage is Used

Although the backend responds with updated user data on PUT requests, it does **not actually persist changes**. That is:

- A successful update returns the modified user object.
- However, any subsequent `GET` request returns the **original, unmodified** data.

To work around this limitation, the app:

- Stores the user list in `localStorage` after initial load.
- Applies updates to `localStorage` after each successful update operation.
- Always reads from `localStorage` rather than fetching fresh data from the backend.

This approach ensures the application reflects user updates even if the backend doesn't actually persist them.

---

### Data Flow Overview

1. The app triggers the `loadUsers`action from the Pinia store.
2. Effect checks `localStorage`:
   - If user data exists, it populates the state from the cached data.
   - If not, fetches from API and stores the result in `localStorage`.
3. On update:
   - PUT request is sent to backend.
   - The response is used to update the **Pinia** store and `localStorage`.
   - No further `GET` is made (to avoid stale data from backend).

This hybrid setup ensures the user sees consistent and up-to-date information, even when the backend lacks real persistence.

---

## Challenges & Solutions

During the development of this application, several challenges arose—particularly related to state consistency and backend behavior. Below are the key problems encountered and how they were addressed:

### 1. Backend Did Not Persist Updates

**Problem:**  
After performing a successful `PUT` request to update a user, the backend returned the updated user in the response. However, subsequent `GET` requests still returned outdated data — indicating that updates were not actually persisted server-side.

**Solution:**  
To work around this limitation, we introduced a hybrid state strategy:
- After a successful update, the modified user is saved to `localStorage`.
- Future reads load users from `localStorage` instead of the backend.
- This ensures the UI remains in sync with the user's actions, even when the backend cannot persist changes.

---

### 2. Pinia Integration with Vue 3 Composition API

With Vue 3’s Composition API and modular architecture, integrating Pinia is straightforward and aligns well with modern Vue development practices. Unlike Angular's constructor-based injection, Pinia stores are directly imported and used within components or other stores.

To manage side effects like API calls, `actions` within Pinia stores use async/await and can access other stores or services directly. This removes the need for complex setup and promotes clean, composable logic.

This seamless integration with Vue’s reactivity model ensures that state updates and side effects are easy to manage and naturally fit into the Vue 3 ecosystem.


---

### 3. Navigating to Non-existent Users

**Problem:**  
If a user navigates to a `/profile-page/:userId` route with an invalid or non-existent ID, the application could display a blank or broken page.

**Solution:**  
In the `ProfilePageComponent`, we check if the user exists after loading data:
- If the user is not found, we automatically redirect the user to a **404 page**.
- This improves the UX and guards against invalid routes.

---

### 4. User Feedback on Errors

**Problem:**  
Silent failures (e.g., network issues or API errors) were confusing to users.

**Solution:**  
We integrated **tostify** to show error messages such as:
- "Failed to load data. Please try again later."
- "Failed to update user."

This ensures that users are notified of issues in a clear and user-friendly way.

---

These strategies helped build a responsive, user-friendly application despite backend limitations. They also ensure the app remains maintainable and ready for future backend upgrades.


## Potential Improvements

Although the application is functional and user-friendly, several enhancements could improve scalability, robustness, and user experience:

### 1. Replace LocalStorage with Real Backend Persistence

Currently, user data is stored in `localStorage` due to the backend not persisting updates. In a production environment, we would:
- Use a persistent backend (e.g., with a database).
- Refactor state management to rely solely on API data rather than local overrides.
- Implement retry mechanisms.

---

### 2. Add Authentication & Authorization

Right now, any user can access and edit any profile via direct URL navigation. In the future:
- Implement login & session management.
- Restrict access based on user roles (e.g., only allow editing of own profile).
- Use route guards to protect sensitive pages.

---

### 3. Enhanced Error Handling

While errors are currently surfaced using **Toastify** for user-friendly notifications, there is room for more advanced error handling, such as:
- Global error handling using Vue's global error handler or Axios interceptors to catch and manage HTTP errors centrally.
- Improved logging mechanisms for easier debugging and tracking of issues during development and production.
- Retry strategies for transient issues like network interruptions, enabling automatic retries for failed requests.

---

### 4. Unit & Integration Testing

Currently, the project focuses on core functionality. For better reliability:
- Add unit tests for services, effects, and reducers.
- Add integration tests for major workflows (e.g., loading and editing a user).

---

### 5. UI/UX Enhancements

To further improve the user experience:
- Add loading indicators while fetching data.
- Improve layout and responsiveness for different devices.
- Add confirmation modals for actions like edit/save.

These improvements would help scale the application, improve maintainability, and prepare it for real-world deployment.

---