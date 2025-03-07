import { useEffect, useRef } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardPreview } from "../components/card-preview";
import { useAuth } from "../context/auth-context";
import { useCards } from "../hooks/use-cards";
import { downloadVCard } from "../utils/vcard";

export default function ViewCardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCard } = useCards();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth();
  const card = getCard(id || "");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card) {
      navigate("/dashboard");
    }
  }, [card, navigate]);

  if (!card) return null;

  const handleShare = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/card/${id}` } });
      return;
    }

    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.firstName} ${card.lastName}'s Business Card`,
          text: `Check out ${card.firstName} ${card.lastName}'s business card`,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        onOpen();
      }
    } else {
      onOpen();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleDownloadVCard = () => {
    downloadVCard(card);
  };

  const handleDownloadImage = () => {
    // In a real implementation, you would use html2canvas or a similar library
    // For now, just show an alert
    alert("This would download the card as an image in a real implementation");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {card.firstName} {card.lastName}'s Card
        </h1>
        <div className="flex gap-2">
          <Tooltip content={user ? "Share Card" : "Login to Share"}>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:share" />}
              onPress={handleShare}
            >
              Share
            </Button>
          </Tooltip>

          <Button
            variant="flat"
            startContent={<Icon icon="lucide:download" />}
            onPress={handleDownloadVCard}
          >
            Download vCard
          </Button>

          <Button
            variant="flat"
            startContent={<Icon icon="lucide:image" />}
            onPress={handleDownloadImage}
          >
            Download Image
          </Button>

          <Button
            as={Link}
            to={`/edit/${card.id}`}
            variant="flat"
            startContent={<Icon icon="lucide:edit" />}
          >
            Edit
          </Button>

          <Button
            as={Link}
            to="/dashboard"
            variant="light"
            startContent={<Icon icon="lucide:arrow-left" />}
          >
            Back
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div id={`card-${card.id}`}>
          <CardPreview data={card} cardRef={cardRef} />
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Share Business Card</ModalHeader>
              <ModalBody>
                <p>Share this link with others:</p>
                <div className="flex mt-2">
                  <input
                    type="text"
                    readOnly
                    value={window.location.href}
                    className="flex-grow p-2 border rounded-l-md"
                  />
                  <Button
                    color="primary"
                    onPress={copyToClipboard}
                    className="rounded-l-none"
                  >
                    Copy
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
