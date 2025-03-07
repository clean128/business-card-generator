import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardForm } from "../components/create-card/card-form";
import { CardPreview } from "../components/card-preview";
import { useCards } from "../hooks/use-cards";
import { DEFAULT_CARD_DATA } from "../constants/global";
import { Card, CardBody } from "@heroui/react";

export default function CreateCardPage() {
  const [formData, setFormData] = useState(DEFAULT_CARD_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const { addCard } = useCards();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (data: typeof formData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const cardId = addCard(data);
      setIsLoading(false);
      navigate(`/card/${cardId}`);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="px-2 py-3 shadow-lg">
          <CardBody>
            <h1 className="text-2xl font-bold mb-2">
              Create Your Business Card
            </h1>

            <p className="text-sm text-gray-600 mb-1">
              Free digital business card download and use
            </p>

            <div className="flex-1">
              <CardForm
                formData={formData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                setFormData={setFormData}
                cardRef={cardRef}
              />
            </div>
          </CardBody>
        </Card>

        <div className="flex-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <CardPreview data={formData} cardRef={cardRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
