"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import Loader from "@/app/components/loader/Loader";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader size="lg" />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
