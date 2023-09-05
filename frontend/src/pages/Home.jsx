import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../componets/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

function Home() {
  const [books, setBooks] = useState("");
  const [loader, setLoader] = useEffect("false");
  useEffect(() => {
    setLoader(true);
    axios.get("localhost:8000/books").then((res) => {
      setBooks(res.data.data);
      setLoader(false);
    });
  });
  return <div className='p-4'>
<div className='flex justify-between items-center'>
<h1 className='text-3xl my-8'>Books List</h1>
<Link to='/books/create'>
<MdOutlineAddBox className='text-sky-800 text-4x1' />
</Link>
</div>
{loader ? (
<Spinner />
) : (
    <table className='w-full border-separate border-spacing-2'>
<thead>
<tr>
<th className='border border-slate-600 rounded-md'>No</th>
<th className='border border-slate-600 rounded-md '>Title</th>
<th className='border border-slate-600 rounded-md max-md:hidden'>
Author
</th>
<th className='border border-slate-600 rounded-md max-md:hidden'>
Publish Year
</th>
<th className='border border-slate-600 rounded-md'>Operations</th>
</tr>
</thead>
<tbody>
{books.map((book, index) => (
<tr key={book._id} className='h-8'>
<td className='border border-slate-700 rounded-md text-center':
{index + 1}
</td>
<td className=' border border-slate-700 rounded-md text-center'>
{book.title}
</td>
<td className='border border-slate-700 rounded-md text-center max-md:hidden'>
{book.author}
</td>
<td className='border border-slate-700 rounded-md text-center max-md:hidden'>
{book.publishYear}
</td>
<td className='border Oborder-slate-700 rounded-md text-center'>
<div className='flex justify-center gap-x-4'>
<Link to={/books/details/${book._id}`}>
<BsInfoCircle className='text-2x1 text-green-800' />
</Link>
<Link to={/books/edit/${book._id}}>
<AiOutlineEdit className='text-2x1 Itext-yellow-600' />
</Link>
<Link to={/books/delete/${book._id}`}>
<MdOutlineDelete className='text-2x1 text-red-600' />
/Link>
</div>
</td>
</tr>
))}
</tbody>

)}
</div>
}

export default Home;
