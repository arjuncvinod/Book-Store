import React , { useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateBooks = () => {
const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [publishYear, setPublishYear] = useState(' ');
const [loading, setLoading] = useState(false);
const navigate = useNavigate()

const handleSaveBook=()=>{
 const data={
  title,
  author,
  publishYear
 }
 setLoading(true)
 axios.post('http://localhost:8000/books',data).then(()=>{
  setLoading(false)
  navigate('/')
 }).catch((err)=>{
  console.log(err);
  setLoading(false)
  alert("error")
 })
}
  return (
    <div>
      CreateBooks
    </div>
  )
}

export default CreateBooks
