import './styles/ExamType.css';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ArithmeticAptitude() {
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
            <div className='h3 border rounded p-3 mb-5 shadow-lg'>Arithmetic Aptitude <br /><br />
                <NavLink to='/user/Exam/12'><button className="btn btn-warning m-2 exam_button grad e" type="button">Calander </button></NavLink><br />
                <NavLink to='/user/Exam/13'><button className="btn btn-warning m-2 exam_button grad e" type="button">Clock </button></NavLink><br />
                <NavLink to='/user/Exam/14'><button className="btn btn-warning m-2 exam_button grad e" type="button">Time and Distance </button></NavLink><br />
                <NavLink to='/user/Exam/15'><button className="btn btn-warning m-2 exam_button grad e" type="button">Area </button></NavLink><br />
                <NavLink to='/user/Exam/16'><button className="btn btn-warning m-2 exam_button grad e" type="button">Simple interest </button></NavLink><br />
                <NavLink to='/user/Exam/17'><button className="btn btn-warning m-2 exam_button grad e" type="button">Problems on Numbers </button></NavLink><br />
                <NavLink to='/user/Exam/18'><button className="btn btn-warning m-2 exam_button grad e" type="button">Odd Man Out and Series</button></NavLink><br />
                <NavLink to='/user/Exam/19'><button className="btn btn-warning m-2 exam_button grad e" type="button">Problems on Trains </button></NavLink><br />
                <NavLink to='/user/Exam/20'><button className="btn btn-warning m-2 exam_button grad e" type="button">Problems on H.C.F and L.C.M </button></NavLink><br />
                <NavLink to='/user/Exam/21'><button className="btn btn-warning m-2 exam_button grad e" type="button">Simplification </button></NavLink><br />

            </div>
        </div>
    )
}

export default ArithmeticAptitude