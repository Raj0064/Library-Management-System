import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AdminBooksPage from './components/admin/AdminBooksPage';
import AddBook from './components/admin/AddBook';
import UpdateBook from './components/admin/UpdateBook';
import ViewBook from './components/admin/ViewBook';
import BookSearchPage from './components/Student/BookSearchPage';
import ViewBookStudent from './components/Student/ViewBookStudent';
import BorrowedBookPage from './components/Student/BorrowedBookPage';
import HomePage from './components/Student/HomePage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminStudentsPage from './components/admin/AdminStudentsPage';
import ViewStudentPage from './components/admin/ViewStudentPage';

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin/books",
    element: <AdminBooksPage />,
  },
  {
    path: "/admin/addbook",
    element: <AddBook />,
  },
  {
    path: "/admin/updatebook/:id",
    element: <UpdateBook />,
  },
  {
    path: "/admin/viewbook/:id",
    element: <ViewBook />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/allusers",
    element: <AdminStudentsPage />,
  },
  {
    path: "/admin/viewstudent/:id",
    element: <ViewStudentPage />,
  },

  //Student Routes
  {
    path: "/user/searchbooks",
    element: <BookSearchPage />,
  },
  {
    path: "/user/viewbook/:id",
    element: <ViewBookStudent />,
  },
  {
    path: "/user/borrowedbooks",
    element: <BorrowedBookPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {

  return (
    <>
    
      <RouterProvider router={appRouter} />

    </>
  );
}

export default App
