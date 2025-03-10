import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./use-local-storage";
import { BusinessCard, CardFormData } from "../types/card";
import { useAuth } from "../context/auth-context";

export function useCards() {
  const [cards, setCards] = useLocalStorage<BusinessCard[]>(
    "business-cards",
    []
  );
  const { user } = useAuth();

  const addCard = (cardData: CardFormData) => {
    const newCard: BusinessCard = {
      ...cardData,
      id: uuidv4(),
      userId: user?.id || null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setCards((prevCards) => [...prevCards, newCard]);
    return newCard.id;
  };

  const updateCard = (id: string, cardData: Partial<CardFormData>) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, ...cardData, updatedAt: Date.now() } : card
      )
    );
  };

  const deleteCard = (id: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const getCard = (id: string) => {
    return cards.find((card) => card.id === id);
  };

  const getPublicCards = () => {
    return cards.filter((card) => card.isPublic);
  };

  const getUserCards = () => {
    if (!user) return [];
    return cards.filter((card) => card.userId === user.id);
  };

  return {
    cards: user ? getUserCards() : cards,
    allCards: cards,
    addCard,
    updateCard,
    deleteCard,
    getCard,
    getPublicCards,
  };
}
