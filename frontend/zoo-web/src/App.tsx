import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Index";

import Animals from "./pages/Animals/Index";
import AnimalsForms from "./pages/Animals/forms";
import AnimalsUpdate from "./pages/Animals/forms";

import Care from "./pages/Care/Index";
import CareForms from "./pages/Care/forms";

export default function App() {

    return (
        <BrowserRouter>

            <Routes>

                
                <Route path="/" element={<Home />} />

                
                <Route path="/animals" element={<Animals />} />
                <Route path="/animal/create" element={<AnimalsForms />} />
                <Route path="/animal/update/:id" element={<AnimalsUpdate />} />

                
                <Route path="/cuidados" element={<Care />} />
                <Route path="/cuidado/create" element={<CareForms />} />
                <Route path="/cuidado/update/:id" element={<CareForms />} />

            </Routes>

        </BrowserRouter>
    )
}