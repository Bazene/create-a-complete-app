import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Header from './components/Header'
import ClientForm from './components/ClientForm'
import FreelanceForm from './components/FreelanceForm'
import Error from './components/Error'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import { createGlobalStyle } from "styled-components";

const root = ReactDOM.createRoot(document.getElementById('root'));
const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

root.render(
  <React.StrictMode>
      <Router>
        <GlobalStyle />
        <Header />
        
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/freelances" element={<Freelances />} />

          <Route path="/survey/:questionNumber" element={<Survey />}>
            <Route path="client" element={<ClientForm />} />
            <Route path="freelance" element={<FreelanceForm />} />
          </Route>
        </Routes>
      </Router>
  </React.StrictMode>
)