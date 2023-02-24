import { GetRequest } from "components/GetRequest/GetRequest";
import { Header } from "components/Header/Header";
import { MainPage } from "components/MainPage/MainPage";
import { PostRequest } from "components/PostRequest/PostRequest/PostRequest";


export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <MainPage />
        <GetRequest />
        <PostRequest />
      </main>
    </div>
  );
};