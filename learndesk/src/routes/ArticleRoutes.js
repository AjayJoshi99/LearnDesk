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
import CalendarTricks from "../componets/Articless/CalendarTricks";
import ProblemsOnTrains from "../componets/Articless/ProblemsOnTrains";
import SeatingArrangements from "../componets/Articless/SeatingArrangements"; 
import MathProgressionsArticle from "../componets/Articless/MathProgressionsArticle";

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
      <Route path="articles/calendar-tricks" element={<CalendarTricks />} />
      <Route path="articles/problems-on-trains" element={<ProblemsOnTrains />} />
      <Route path="articles/seating-arrangements" element={<SeatingArrangements />} />
      <Route path="articles/math-progressions" element={<MathProgressionsArticle />} />
    </>
  );
};
