import { Route } from "react-router-dom";
import NumbersArticle from "../componets/Articless/numbers";
import WorkTimeArticle from "../componets/Articless/WorkTimeArticle";   
import Articles from "../componets/Articles";
import PipeCisternArticle from "../componets/Articless/PipeCisternArticle";
import SpeedDistanceTimeArticle from "../componets/Articless/SpeedDistanceTimeArticle";
import HcfLcmArticle from "../componets/Articless/HcfLcmArticle";
import PercentageArticle from "../componets/Articless/PercentageArticle";
import RatioProportionArticle from "../componets/Articless/RatioProportionArticle";
import AgeAptitudeArticle from "../componets/Articless/AgeAptitudeArticle";
import ProfitLossArticle from "../componets/Articless/ProfitLossArticle";
import ClockConcept from "../componets/Articless/ClockConcept";
import CodingDecoding from "../componets/Articless/CodingDecoding";
import SimpleCompoundInterest from "../componets/Articless/SimpleCompoundInterest";
import PermutationsCombinations from "../componets/Articless/PermutationsCombinations";

export const ArticleRoutes = () => {
  return (
    <>
      <Route path="articles" element={<Articles />} />
      <Route path="articles/numbers" element={<NumbersArticle />} />
      <Route path="articles/work-time" element={<WorkTimeArticle />} />
      <Route path="articles/pipe-cistern" element={<PipeCisternArticle />} />
      <Route path="articles/speed-distance-time" element={<SpeedDistanceTimeArticle />} />
      <Route path="articles/hcf-lcm" element={<HcfLcmArticle />} />
      <Route path="articles/percentage" element={<PercentageArticle />} />
      <Route path="articles/ratio-proportion" element={<RatioProportionArticle />} />
      <Route path="articles/age-aptitude" element={<AgeAptitudeArticle />} />
      <Route path="articles/profit-loss" element={<ProfitLossArticle />} />
      <Route path="articles/clock-concept" element={<ClockConcept />} />
      <Route path="articles/coding-decoding" element={<CodingDecoding />} />
      <Route path="articles/simple-compound-interest" element={<SimpleCompoundInterest />} />
      <Route path="articles/permutations-combinations" element={<PermutationsCombinations />} />
    </>
  );
};
