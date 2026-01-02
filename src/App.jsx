
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuotationUI from "./features/quotation/QuotationUI.jsx";
import { store } from "./store/store";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuotationUI />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
