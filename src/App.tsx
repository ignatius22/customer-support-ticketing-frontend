import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import routes from "./routes";
import { Suspense } from "react";
import './App.css'  

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <Routes>
              {routes.map(({ path, element, index }, idx) => (
                <Route key={idx} path={path} element={element} index={index} />
              ))}
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
