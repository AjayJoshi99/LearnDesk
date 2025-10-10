import {NavLink } from 'react-router-dom'
import './styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="homeDiv">
      <div className='childDiv'>
        <span className='h4'>Note  : </span><br/>
        <p>1. There will be 10 Questions in all quiz.</p>
        <p>2. Every quiz will have 15 minutes to be solved. After 15 minutes quiz will be automatically submitted.</p>
        <p>3. You can submit quiz whenever you want , after submissionfo quiz you will get result along with it's actual answers</p>
      </div>
      <div className='childDiv' style={{ backgroundImage: "url('/bg1.png')", backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Arithmetic Aptitude</span><br/>
        <ul>
          <li><NavLink to='/user/Exam/12'><button className='btn text-primary'>Calander</button></NavLink></li>
          <li><NavLink to='/user/Exam/14'><button className='btn text-primary'>Time and Distance </button></NavLink></li>
          <li><NavLink to='/user/Exam/15'><button className='btn text-primary'>Area</button></NavLink></li>
          <li><NavLink to='/user/Exam/13'><button className='btn text-primary'>Clock</button></NavLink></li>
          <NavLink to="/user/ArithmeticAptitude"><button className='btn'><span className='h4'>See more....</span></button></NavLink>
          </ul>
          <br/><br/>
      </div>

      <div className='childDiv' style={{ backgroundImage: "url('/bg3.png')", backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Logical Reasoning</span><br/>
        <ul>
          <li><NavLink to='/user/Exam/0'><button className='btn text-primary'>Number Series - I </button></NavLink></li>
          <li><NavLink to='/user/Exam/11'><button className='btn text-primary'>Letter and Symbol Series </button></NavLink></li>
          <li><NavLink to='/user/Exam/25'><button className='btn text-primary'>Artificial Language</button></NavLink></li>
          <li><NavLink to='/user/Exam/28'><button className='btn text-primary'>Analogies </button></NavLink></li>
          <NavLink to="/user/Logical_reasoning"><button className='btn'><span className='h4'>See more....</span></button></NavLink>
          </ul>
          <br/><br/>
      </div>


      <div className='childDiv' style={{ backgroundImage: "url('/bg2.png')", backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Verbal Ability</span><br/>
        <ul>
          <li><NavLink to='/user/Exam/3'><button className='btn text-primary'>Selecting Words</button></NavLink></li>
          <li><NavLink to='/user/Exam/4'><button className='btn text-primary'>One Word Substitutes </button></NavLink></li>
          <li><NavLink to='/user/Exam/5'><button className='btn text-primary'>Spellings</button></NavLink></li>
          <li><NavLink to='/user/Exam/6'><button className='btn text-primary'>Sentence Formation </button></NavLink></li>
          <NavLink to="/user/VerbalAbility"><button className='btn'><span className='h4'>See more....</span></button></NavLink>
          </ul>
          <br/><br/>
      </div>


      <div className='childDiv' style={{ backgroundImage: "url('/bg4.png')", backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
        <span className='h2 h'>Non Verbal Reasoning</span><br/>
        <ul>
          <li><NavLink to='/user/Exam/7'><button className='btn text-primary'>Blood Relation - I</button></NavLink></li>
          <li><NavLink to='/user/Exam/8'><button className='btn text-primary'>Direction and Sences </button></NavLink></li>
          <li><NavLink to='/user/Exam/9'><button className='btn text-primary'>Find the Odd</button></NavLink></li>
          <li><NavLink to='/user/Exam/10'><button className='btn text-primary'>Classification</button></NavLink></li>
          <NavLink to="/user/NonVerbalReasoning"><button className='btn'><span className='h4'>See more....</span></button></NavLink>
          </ul>
          <br/><br/>
      </div>

    </div>
  )
}

export default Dashboard;