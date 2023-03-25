import React from "preact/compat";

export const Layout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="md:p-8">
      <div className="mx-auto max-w-xl">
        <main className="bg-white md:rounded-xl md:shadow-xl min-h-[400px] p-4">{children}</main>
      </div>
    </div>
  );
};
