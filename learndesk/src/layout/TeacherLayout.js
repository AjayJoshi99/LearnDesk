import Navbar from "../componets/TeacherComponet/navbar";
import { Outlet } from "react-router-dom";
export default function TeacherLayout() {
  return (
    <div >
      
      <Navbar />
      <div className="main-content"> <Outlet /></div>
    </div>
  );
}
