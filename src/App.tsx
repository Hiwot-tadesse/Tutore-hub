import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import Videos from './pages/Videos';
import Community from './pages/Community';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'books':
        return <Books />;
      case 'videos':
        return <Videos />;
      case 'community':
        return <Community onNavigate={setCurrentPage} />;
      case 'auth':
        return <Auth onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </AuthProvider>
  );
}

export default App;
