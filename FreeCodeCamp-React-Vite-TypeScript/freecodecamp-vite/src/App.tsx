import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./App.css";
import "../components/certificate-1-Palindrome/padindrome";
import Palindrome from "../components/certificate-1-Palindrome/padindrome";
import ParseInt from "../components/certificate-2-convert-parseInt-so-la-ma/parseInt";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <aside className="side-bar">
          <ul className="category-list">
            <li className="category-item">
              <Link to="/palindrome">Palindrome</Link>
            </li>
            <li className="category-item">
              <Link to="/parseInt">Convert ParseInt So La ma</Link>
            </li>
            <li className="category-item">
              <a href="#" className="category-link">
                Number Telephone Validator
              </a>
            </li>
            <li className="category-item">
              <a href="#" className="category-link">
                Cash Register
              </a>
            </li>
            <li className="category-item">
              <a href="#" className="category-link">
                Api Pokemon
              </a>
            </li>
          </ul>
        </aside>
        <section className="content">
          <h1>content</h1>
        </section>
      </div>
      <Routes>
        <Route path="/palindrome" element={<Palindrome />} />
        <Route path="/parseInt" element={<ParseInt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
