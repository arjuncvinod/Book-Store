import { useState , useEffect } from "react";
import Spinner from "../componets/Spinner";
import Backbutton from "../componets/Backbutton";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { api } from "../../config";
const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(" ");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams()
  const {enqueueSnackbar} = useSnackbar()
useEffect(()=>{
  setLoading(true)
  axios.get(`${api}/books/${id}`).then((res)=>{
    setTitle(res.data.title)
    setAuthor(res.data.author)
    setPublishYear(res.data.publishYear)
    setLoading(false)
  }).catch((err)=>{
    console.log(err);
    setLoading(false)
    enqueueSnackbar("Error Retrieving Book",{variant:'error'});
    alert("error")
  })
},[])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`${api}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Updated Succesfully",{variant:'success'})
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
      });
  };
  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Published Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Update
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
