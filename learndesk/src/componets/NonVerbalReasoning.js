import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function NonVerbalReasoning() {
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
        <div className='h3 border rounded p-3 mb-5 shadow-lg'>Non Verbal Reasoning<br /><br />
          <NavLink to='/user/Exam/7'><button className="btn btn-warning m-2 exam_button grad e" type="button">Blood Relation - I</button></NavLink><br />
          <NavLink to='/user/Exam/8'><button className="btn btn-warning m-2 exam_button grad e" type="button">Direction and Sences </button></NavLink><br />
          <NavLink to='/user/Exam/9'><button className="btn btn-warning m-2 exam_button grad e" type="button">Find the Odd </button></NavLink><br />
          <NavLink to='/user/Exam/9'><button className="btn btn-warning m-2 exam_button grad e" type="button">Classification </button></NavLink><br />
          <NavLink to='/user/Exam/10'><button className="btn btn-warning m-2 exam_button grad e" type="button">Verification of Truth </button></NavLink><br />
        </div>
    </div>
  )
}

export default NonVerbalReasoning;