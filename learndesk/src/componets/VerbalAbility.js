import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


function VerbalAbility() {
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
        <div className='h3 border rounded p-3 mb-5 shadow-lg'>Verbal Ability<br /><br />
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(3, "Selecting Words")}>Selecting Words</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(4, "One Word Substitutes")}>One Word Substitutes</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(5, "Spellings")}>Spellings</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(6, "Sentence Formation")}>Sentence Formation</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(22, "Synonyms")}>Synonyms</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(23, "Sentence Improvement")}>Sentence Improvement</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(29, "Spotting Errors")}>Spotting Errors</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(30, "Verbal Analogies")}>Verbal Analogies</button><br/>
          <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(32, "Antonyms")}>Antonyms</button><br/>
          </div>
    </div>
  )
}

export default VerbalAbility;
