import React from "react";
import { store } from "@/store";
import { Provider } from "react-redux";

export function StoreProvider(props: React.PropsWithChildren) {
  return <Provider store={store}>{props.children}</Provider>;
}
