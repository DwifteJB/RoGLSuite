import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './Render/App.tsx'
import SignIn from './Render/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/">
      <Route index element={<SignIn />}/>
      <Route path="App" element={<App />} />

    </Route>
  </Routes>
</BrowserRouter>
);

