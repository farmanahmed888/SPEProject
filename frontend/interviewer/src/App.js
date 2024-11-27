import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobForm from './pages/JobForm';
import ViewEnrollments from './pages/ViewEnrollments';
import ViewPreviousJobs from './pages/ViewPreviousJobs';
import ViewActiveJobs from './pages/ViewActiveJobs';
import DisplayResult from './pages/DisplayResult';
import Layout from './pages/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Login />}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-job" element={<JobForm />} />
                <Route path="/active-jobs-view" element={<ViewEnrollments />} />
                <Route path="/view-result" element={<DisplayResult/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
