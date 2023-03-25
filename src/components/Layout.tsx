import React from "preact/compat";

export const Layout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-xl">
        <header className="text-center mb-4">
          <h1 className="">RandL</h1>
          <h2>Read and Learn a Foreign Language</h2>
        </header>
        <main className="bg-white rounded-lg shadow-xl min-h-[500px] p-4">{children}</main>
      </div>
    </div>
  );
};
