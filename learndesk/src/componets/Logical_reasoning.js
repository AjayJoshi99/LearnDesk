import React from 'react'
import {NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


function Logical_reasoning() {
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
         <div className='h3 border rounded p-3 mb-5 shadow-lg'>Logical Reasoning<br/><br/>
         <NavLink to={`/user/Exam/0/NumberSeries-I`} > <button className="btn btn-warning m-2 exam_button grad e" type="button"> Number Series - I</button></NavLink><br/>
         <NavLink to='/user/Exam/1'><button className="btn btn-warning m-2 exam_button grad e" type="button">Number Series - II </button></NavLink><br/>
         <NavLink to='/user/Exam/31'><button className="btn btn-warning m-2 exam_button grad e" type="button">Number Series - III  </button></NavLink><br/>
         <NavLink to='/user/Exam/11'><button className="btn btn-warning m-2 exam_button grad e" type="button">Letter and Symbol Series </button></NavLink><br/>
         <NavLink to='/user/Exam/24'><button className="btn btn-warning m-2 exam_button grad e" type="button">Theme Detection </button></NavLink><br/>
         <NavLink to='/user/Exam/25'><button className="btn btn-warning m-2 exam_button grad e" type="button">Artificial Language </button></NavLink><br/>
         <NavLink to='/user/Exam/26'><button className="btn btn-warning m-2 exam_button grad e" type="button">Essential Part </button></NavLink><br/>
         <NavLink to='/user/Exam/27'><button className="btn btn-warning m-2 exam_button grad e" type="button">Verbal Classification </button></NavLink><br/>
         <NavLink to='/user/Exam/28'><button className="btn btn-warning m-2 exam_button grad e" type="button">Analogies </button></NavLink><br/>
        </div>
      
    </div>
    
  )
}

export default Logical_reasoning