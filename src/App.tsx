import type { Component } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import { TogPage } from '@pages/index';

export const App: Component = () => {
  return (
    <Routes>
      <Route path="/" element={<TogPage />} />
    </Routes>
  );
};
