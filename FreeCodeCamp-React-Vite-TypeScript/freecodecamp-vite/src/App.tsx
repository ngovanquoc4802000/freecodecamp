import { BrowserRouter, Link, Route, Routes } from "react-router";
import "../components/certificate-1-Palindrome/padindrome";
import Palindrome from "../components/certificate-1-Palindrome/padindrome";
import ParseInt from "../components/certificate-2-convert-parseInt-so-la-ma/parseInt";
import Telephone from "../components/certificate-3-number-telephone-validator/telephone";
import Cash from "../components/certificate-4-cash-register/cash";
import Pokemon from "../components/certificate-5-Api-Pokemon/Pokemon";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <aside className="side-bar">
          <ul className="category-list">
            <li className="category-item">
              <Link className="category-link" to="/palindrome">
                Palindrome
              </Link>
            </li>
            <li className="category-item">
              <Link className="category-link" to="/parseInt">
                Convert ParseInt So La ma
              </Link>
            </li>
            <li className="category-item">
              <Link className="category-link" to="/telephone">
                Number Telephone Validator
              </Link>
            </li>
            <li className="category-item">
              <Link className="category-link" to="/cash">
                Cash Register
              </Link>
            </li>
            <li className="category-item">
              <Link className="category-link" to="/ApiPokemon">
                Api Pokemon
              </Link>
            </li>
          </ul>
        </aside>
        <section className="content">
          <Routes>
            <Route path="/palindrome" element={<Palindrome />} />
            <Route path="/parseInt" element={<ParseInt />} />
            <Route path="/telephone" element={<Telephone />} />
            <Route path="/cash" element={<Cash />} />
            <Route path="/ApiPokemon" element={<Pokemon />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
