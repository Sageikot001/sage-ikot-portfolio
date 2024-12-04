import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from './components';
import AddProject from './pages/AddProject';

// Create a Home component for the main page content
const Home = () => (
  <div className='relative z-0 bg-primary'>
    <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
      <Navbar />
      <Hero />
    </div>
    <About/>
    <Experience/>
    <Tech/>
    <Works/>
    <Feedbacks/>
    <div className='relative z-0'>
      <Contact/>
      <StarsCanvas/>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-project" element={<AddProject />} />
      </Routes>
    </Router>
  )
}

export default App
