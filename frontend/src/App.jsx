import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AdminBooksPage from './components/admin/AdminBooksPage';
import AddBook from './components/admin/AddBook';
import UpdateBook from './components/admin/UpdateBook';
import ViewBook from './components/admin/ViewBook';
import BookSearchPage from './components/Student/BookSearchPage';

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

  //Student Routes
  {
    path: "/user/searchbooks",
    element: <BookSearchPage />,
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
