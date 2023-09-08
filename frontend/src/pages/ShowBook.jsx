import {useEffect,useState} from 'react'
import axios from 'axios'
import Spinner from '../componets/Spinner'
import Backbutton from '../componets/Backbutton'
import { useParams } from 'react-router-dom'
import { api } from '../../config'


function ShowBook() {
const [book,setBook]=useState("")
const [loading,setLoading]=useState(false)
const {id}=useParams()

useEffect(()=>{
  setLoading(true)
  axios.get(`${api}/books/${id}`).then((res)=>{
    setBook(res.data)
    console.log(res.data);
    setLoading(false)
  }).catch((error)=>{
    console.log(error);
    setLoading(false)
  })
},[])
  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4">
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Id</span>
            <span> {book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Title</span>
            <span> {book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Author</span>
            <span> {book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Publish Year</span>
            <span> {book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Created At</span>
            <span> {new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBook
