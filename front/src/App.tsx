import News from "./Features/News/News.tsx";
import { Route, Routes } from "react-router-dom";
import FullNews from "./Features/FullNews/FullNews.tsx";
import Form from "./Features/Form/Form.tsx";

const App = () => {
  return (
    <>
      <header
        style={{
          padding: "20px",
          background: "#646cff",
          color: "white",
          marginBottom: "40px",
        }}
      >
        News
      </header>
      <Routes>
        <Route path={"/"} element={<News />} />
        <Route path={"/addNews"} element={<Form />} />
        <Route path={"/fullNews/:id"} element={<FullNews />} />
      </Routes>
    </>
  );
};

export default App;
