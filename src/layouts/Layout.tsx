import { Component, children, JSX } from 'solid-js';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: Component<LayoutProps> = (props) => {
  const c = children(() => props.children);

  return (
    <div class="flex flex-col min-h-screen text-zinc-200 bg-zinc-800 p-8">
      {c()}
    </div>
  );
};
