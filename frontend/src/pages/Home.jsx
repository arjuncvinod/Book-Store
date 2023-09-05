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
  return <div></div>;
}

export default Home;
