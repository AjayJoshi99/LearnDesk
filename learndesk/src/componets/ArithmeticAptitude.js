import './styles/ExamType.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ArithmeticAptitude() {
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
            <div className='h3 border rounded p-3 mb-5 shadow-lg'>Arithmetic Aptitude <br /><br />
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(12, "Calander")}>Calander</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(13, "Clock")}>Clock</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(14, "Time and Distance")}>Time and Distance</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(15, "Area")}>Area</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(16, "Simple interest")}>Simple interest</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(17, "Problems on Numbers")}>Problems on Numbers</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(18, "Odd Man Out and Series")}>Odd Man Out and Series</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(19, "Problems on Trains")}>Problems on Trains</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(20, "Problems on H.C.F and L.C.M")}>Problems on H.C.F and L.C.M</button><br/>
                <button className="btn btn-warning m-2 exam_button grad e" type="button" onClick={() => handleonclick(21, "Simplification")}>Simplification</button><br/>
            </div>
        </div>
    )
}

export default ArithmeticAptitude