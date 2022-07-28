import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Flashcard from "./Flashcard";
import "../assets/css/flashcard.css";

export default function Training() {
  useEffect(() => {
    const getAllFlashcards = async () => {
      const res = await axios.get(
        // `http://localhost:5005/api/user/${userId}/collection/${collectionId}/training`
        `${process.env.REACT_APP_BACKEND_URI}/api/user/${userId}/collection/${collectionId}/training`
      );
      getFlashcards(res.data.flashcards);
    };
    getAllFlashcards();
  }, []);

  const [shownCard, setShownCard] = useState(0)

  const { userId } = useParams();
  const { collectionId } = useParams();

  const [flashcards, getFlashcards] = useState([]);

  const handleShownCard = () => {
    setShownCard(prev => (prev + 1) % flashcards.length)
  }

  return (
    <div className="flashcard-container">
      <div>
        <Flashcard flashcard={flashcards[shownCard] || {}}></Flashcard>
      </div>

      <div>
        <p onClick={handleShownCard}>CLICK ME</p>
      </div>
    </div>
  );
}
