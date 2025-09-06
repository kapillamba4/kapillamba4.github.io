import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import MediumRedirect from "./pages/MediumRedirect";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Router>
        <Routes>
          <Route path="/medium/*" element={<MediumRedirect />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/reading" element={<Reading />} />
                <Route path="/writing" element={<Writing />} />
              </Routes>
            </Layout>
          } />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
