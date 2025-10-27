import {useNavigate} from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function LogicalReasoning() {
  const x = useNavigate();
  const handleonclick = (id, name) => {
    localStorage.setItem("quizName", name); 
    x(`/user/Exam/${id}`);
  }

  return (
    <div className='text-center'>
          <div className='text-start mb-3'>
                <button
                    className='btn btn-primary'
                    onClick={() => x(-1)} 
                >
                     <ArrowLeft size={20} className="me-2" /> Back
                </button>
            </div>
         <div className='h3 border rounded p-3 mb-5 shadow-lg'>Logical Reasoning<br/><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(0, "Number Series - I")}>Number Series - I</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(1, "Number Series - II")}>Number Series - II</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(31, "Number Series - III")}>Number Series - III</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(11, "Letter and Symbol Series")}>Letter and Symbol Series</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(24, "Theme Detection")}>Theme Detection</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(25, "Artificial Language")}>Artificial Language</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(26, "Essential Part")}>Essential Part</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(27, "Verbal Classification")}>Verbal Classification</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(28, "Analogies")}>Analogies</button><br/>
        </div>
      
    </div>
    
  )
}

export default LogicalReasoning