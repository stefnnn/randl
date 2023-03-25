import React from "preact/compat";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { ApiProvider } from "./lib/api";

export function App() {
  return (
    <ApiProvider>
      <Layout>
        <Main />
      </Layout>
    </ApiProvider>
  );
}
