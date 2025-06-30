
# 📨 Customer Support Ticket System — Frontend

This is the **frontend application** for the Customer Support Ticketing System. It allows agents and customers to log in, manage tickets, upload attachments, and communicate within the platform.

---

## 🌐 Live Demo

👉 [Deployed Frontend App](https://dreamy-eclair-2cf1f5.netlify.app)  
👉 [GraphQL API](https://customersupportticketapi-production.up.railway.app/graphql)

---

## 🧰 Tech Stack

- **React 18+**
- **TypeScript**
- **Apollo Client (GraphQL)**
- **React Router DOM**
- **TailwindCSS**
- **Vite** (or Create React App, if applicable)
- **Cloudinary (for file previews via Active Storage)**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git https://github.com/ignatius22/customer-support-ticketing-frontend
cd customer-support-frontend
````

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Set environment variables

Create a `.env` file in the root with:

```env
VITE_API_URL=http://localhost:3000/graphql
VITE_APP_NAME=SupportDesk
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

---

## 👤 Test Users

Use the following credentials for testing:

### 🧑‍💼 Agent

* **Email:** `agent@example.com`
* **Password:** `strongpass123`

### 🙋‍♂️ Customer

* **Email:** `customer1@example.com`
* **Password:** `strongpass123`

---

## 🔐 Authentication

* JWT tokens are stored in local storage.
* All protected routes require login.
* Role-based access is enforced in the UI (agent vs customer dashboard).

---

## 🧾 Features

* 🔐 Login / Signup with JWT
* 📄 Create & view support tickets
* 📎 Upload attachments (images, docs)
* 🎫 Filter tickets by status
* 📤 Export closed tickets (agents only)
* 🔁 Real-time feedback on uploads & job states
* 💬 UI prepared for future chat/reply features

---

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

Then preview:

```bash
npm run preview
```

---

## 🧪 Testing (Optional)

> (Only if you've set up testing like Vitest or React Testing Library)

```bash
npm run test
```

---

## 🧠 Notes

This frontend was built to connect seamlessly with the Rails + GraphQL backend.

To fully test the system:

* Ensure the backend is running and seeded
* Use a GraphQL client (like Altair or Insomnia) to inspect APIs
* Use console logs to debug token/auth if needed

---

## 👤 Author

Built and maintained by **Ignatius Sani**

---

## 📬 Questions?

Feel free to [open an issue](https://github.com/ignatius22/customer-support-ticketing-frontend/issues) or reach out via GitHub.



