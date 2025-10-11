import { Route } from "react-router-dom";
import NumbersArticle from "../componets/Articless/numbers";
import WorkTimeArticle from "../componets/Articless/WorkTimeArticle";   
import Articles from "../componets/Articles";


export const ArticleRoutes = () => {
  return (
    <>
      <Route path="articles" element={<Articles />} />
      <Route path="articles/numbers" element={<NumbersArticle />} />
      <Route path="articles/work-time" element={<WorkTimeArticle />} />
      
    </>
  );
};
