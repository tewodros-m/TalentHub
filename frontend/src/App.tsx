import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <nav className='bg-primary text-white p-4'>
          <Link to='/' className='font-bold text-xl'>
            TalentHub
          </Link>
        </nav>

        <main className='flex-1 p-4'>
          <Routes>
            <Route path='/' element={<h1>Landing Page</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
