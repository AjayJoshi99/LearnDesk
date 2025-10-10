import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


function VerbalAbility() {
  const navigate = useNavigate(); 
  return (
    <div className='text-center'>
      <div className='text-start mb-3'>
                <button
                    className='btn btn-primary'
                    onClick={() => navigate(-1)} 
                >
                     <ArrowLeft size={20} className="me-2" /> Back
                </button>
            </div>
        <div className='h3 border rounded p-3 mb-5 shadow-lg'>Verbal Ability<br /><br />
          <NavLink to='/user/Exam/3'><button className="btn btn-warning m-2 exam_button grad e" type="button">Selecting Words</button></NavLink><br />
          <NavLink to='/user/Exam/4'><button className="btn btn-warning m-2 exam_button grad e" type="button">One Word Substitutes </button></NavLink><br />
          <NavLink to='/user/Exam/5'><button className="btn btn-warning m-2 exam_button grad e" type="button">Spellings </button></NavLink><br />
          <NavLink to='/user/Exam/6'><button className="btn btn-warning m-2 exam_button grad e" type="button">Sentence Formation </button></NavLink><br />
          <NavLink to='/user/Exam/22'><button className="btn btn-warning m-2 exam_button grad e" type="button">Synonyms </button></NavLink><br />
          <NavLink to='/user/Exam/23'><button className="btn btn-warning m-2 exam_button grad e" type="button">Sentence Improvement </button></NavLink><br />
          <NavLink to='/user/Exam/29'><button className="btn btn-warning m-2 exam_button grad e" type="button">Spotting Errors </button></NavLink><br />
          <NavLink to='/user/Exam/30'><button className="btn btn-warning m-2 exam_button grad e" type="button">Verbal Analogies </button></NavLink><br />
          <NavLink to='/user/Exam/32'><button className="btn btn-warning m-2 exam_button grad e" type="button">Antonyms </button></NavLink><br />
        </div>
    </div>
  )
}

export default VerbalAbility;
