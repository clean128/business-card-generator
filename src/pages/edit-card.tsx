import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CardForm } from "../components/create-card/card-form";
import { CardPreview } from "../components/card-preview";
import { useCards } from "../hooks/use-cards";
import { DEFAULT_CARD_DATA } from "../constants/global";

export default function EditCardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCard, updateCard } = useCards();
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const card = getCard(id || "");

  useEffect(() => {
    if (!card) {
      navigate("/dashboard");
    }
  }, [card, navigate]);

  const handleSubmit = (data: typeof DEFAULT_CARD_DATA) => {
    if (!id) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      updateCard(id, data);
      setIsLoading(false);
      navigate(`/card/${id}`);
    }, 1000);
  };

  if (!card) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Business Card</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <CardForm
            formData={card}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            setFormData={() => {}}
          />
        </div>

        <div className="flex-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <CardPreview data={card} cardRef={cardRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
