import './styles/Dashboard.css';
import {useNavigate} from 'react-router-dom';

function Dashboard() {
  const x = useNavigate();
  const handleonclick = (id, name) => {
    localStorage.setItem("quizName", name); 
    x(`/user/Exam/${id}`);
  }
  return (
    <div className="homeDiv">
      <div className='childDiv'>
        <span className='h4'>Note  : </span><br/>
        <p>1. There will be 10 Questions in all quiz.</p>
        <p>2. Every quiz will have 15 minutes to be solved. After 15 minutes quiz will be automatically submitted.</p>
        <p>3. You can submit quiz whenever you want , after submissionfo quiz you will get result along with it's actual answers</p>
      </div>
      <div className='childDiv' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg1.png)`, backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Arithmetic Aptitude</span><br/>
        <ul>
          <li><button className='btn text-primary' onClick={() => handleonclick(12, "Calander")}>Calander</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(14, "Time and Distance")}>Time and Distance</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(15, "Area")}>Area</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(13, "Clock")}>Clock</button></li>
          <li><button className='btn' onClick={() => {x("/user/ArithmeticAptitude");}}><span className='h4'>See more....</span></button></li>
        </ul>
          <br/><br/>
      </div>

      <div className='childDiv' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg3.png)`, backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Logical Reasoning</span><br/>
        <ul>
          <li><button className='btn text-primary' onClick={() => handleonclick(0, "Number Series - I")}>Number Series - I</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(11, "Letter and Symbol Series")}>Letter and Symbol Series</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(25, "Artificial Language")}>Artificial Language</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(28, "Analogies")}>Analogies</button></li>
          <li><button className='btn' onClick={() => {x("/user/LogicalReasoning");}}><span className='h4'>See more....</span></button></li>
        </ul>
          <br/><br/>
      </div>


      <div className='childDiv' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg2.png)`, backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Verbal Ability</span><br/>
        <ul>
          <li><button className='btn text-primary' onClick={() => handleonclick(3, "Selecting Words")}>Selecting Words</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(4, "One Word Substitutes")}>One Word Substitutes</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(5, "Spellings")}>Spellings</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(6, "Sentence Formation")}>Sentence Formation</button></li>
          <li><button className='btn' onClick={() => {x("/user/VerbalAbility");}}><span className='h4'>See more....</span></button></li>
        </ul>
          <br/><br/>
      </div>


      <div className='childDiv' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg4.png)`, backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Non Verbal Reasoning</span><br/>
        <ul>
          <li><button className='btn text-primary' onClick={() => handleonclick(7, "Blood Relation - I")}>Blood Relation - I</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(8, "Direction and Sences")}>Direction and Sences</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(9, "Find the Odd")}>Find the Odd</button></li>
          <li><button className='btn text-primary' onClick={() => handleonclick(10, "Classification")}>Classification</button></li>
          <li><button className='btn' onClick={() => {x("/user/NonVerbalReasoning");}}><span className='h4'>See more....</span></button></li>
        </ul>
          <br/><br/>
      </div>

    </div>
  )
}

export default Dashboard;