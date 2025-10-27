import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function NonVerbalReasoning() {
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
        <div className='h3 border rounded p-3 mb-5 shadow-lg'>Non Verbal Reasoning<br /><br />
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(7, "Blood Relation - I")}>Blood Relation - I</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(8, "Direction and Sences")}>Direction and Sences</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(9, "Find the Odd")}>Find the Odd</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(9, "Classification")}>Classification</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(10, "Verification of Truth")}>Verification of Truth</button><br/>
          </div>
    </div>
  )
}

export default NonVerbalReasoning;