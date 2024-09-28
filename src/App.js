import React, { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db ,auth } from "./config/firebase";
import { getDocs, collection ,addDoc , deleteDoc , doc , updateDoc } from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const moviesCollection = collection(db, "Movies");

  const [newMovieName, setNewMovieName] = useState("");
  const [newReleasedDate, setNewReleasedDate] = useState(0);
  const [isNewOscar, setIsNewOscar] = useState(false);
  const [updateName , setUpdateName] = useState("");


  const getMovieList = async () => {
    //READ THE DATA , SET MOVIE LIST
    try {
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    getMovieList();
  }, []);


const deleteMovie = async(id) => {
  await(deleteDoc(doc(db , "Movies" , id)));
}

const UpdateMovie = async(id) => {
  const movieDoc = doc(db , "Movies" , id);
  await updateDoc(movieDoc, {Name: updateName});
}

const submitMovie = async () => {
  try{
      await addDoc(moviesCollection, {
        Name: newMovieName,
        ReleasedIn: newReleasedDate,
        WonOscar: isNewOscar,
        userId : auth?.currentUser?.uid
      });
      getMovieList();
  } catch(err){
    console.error(err);
    
  }
}

  return (
    <div>
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Enter Movie Name ..."
          onChange={(e) => setNewMovieName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date ..."
          onChange={(e) => setNewReleasedDate(e.target.value)}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsNewOscar(e.target.checked)}
        />
        <label>Won Oscar</label>
        <button onClick={submitMovie}>Submit</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.WonOscar ? "green" : "red" }}>
              {" "}
              {movie.Name}
            </h1>
            <p>{movie.ReleasedIn}</p>
            <button onClick={() => UpdateMovie(movie.id)}>Update Movie</button>
            <input type="text" placeholder="Edit Movie Name" onChange={(e) => setUpdateName(e.target.value)} />
            <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
