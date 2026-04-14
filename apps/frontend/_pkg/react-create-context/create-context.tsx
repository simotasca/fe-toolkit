import React from "react";

const NullCtx: unique symbol = Symbol("NULL_CTX");

export class ContextError extends Error {}

export function createContext<C = any>(p: { errorMsg?: string; initialValue?: C; initializer: () => C;}): 
  [React.Context<C | typeof NullCtx>, () => C, (p: React.PropsWithChildren) => React.JSX.Element];

export function createContext<C = any>(p?: { errorMsg?: string; initialValue?: C; initializer?: never }): 
  [React.Context<C | typeof NullCtx>, () => C, (p: React.PropsWithChildren<{ value: C }>) => React.JSX.Element];

export function createContext<C = any>(p) {
  const context = React.createContext<C | typeof NullCtx>(p?.initialValue || NullCtx);
  const hook = () => {
    const value = React.useContext(context);
    if (value === NullCtx) throw new ContextError(p?.errorMsg ?? "cannot use context outside provider");
    return value;
  };
  const Provider = (p && p.initializer != undefined) 
    ? ({ children }: React.PropsWithChildren) => <context.Provider value={p.initializer()}>{children}</context.Provider>
    : ({ value, children }: React.PropsWithChildren<{ value: C }>) => <context.Provider value={value}>{children}</context.Provider> 
  return [context, hook, Provider];
}
