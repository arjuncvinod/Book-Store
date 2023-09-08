import axios from "axios";
import Spinner from "../componets/Spinner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BookTable from "../componets/Home/BookTable";
import BookCard from "../componets/Home/BookCard";
import { MdOutlineAddBox } from "react-icons/md";
import { api } from "../../config";
function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState("false");
  const [showType,setShowType] = useState("table")
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/books`)
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
    <div className='flex justify-center items-center gap-x-4'>
<button className= "bg-sky-300 hover: bg-sky-600 px-4 py-1 rounded-lg"
onClick={() => setShowType('table')} >
Table
</button>
<button
className= "bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
onClick={() => setShowType('card')}>
Card
</button>
</div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
        </Link>
      </div>
      {loading ? <Spinner /> : showType==="table" ?<BookTable books={books} /> : <BookCard books={books}/>}
    </div>
  );
}
export default Home;
