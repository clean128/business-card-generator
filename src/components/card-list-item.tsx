import { Link } from "react-router-dom";
import { Card, CardBody, Button, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import { BusinessCard } from "../types/card";

interface CardListItemProps {
  card: BusinessCard;
  onDelete: (id: string) => void;
}

export function CardListItem({ card, onDelete }: CardListItemProps) {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-row items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white"
          style={{ backgroundColor: card.color }}
        >
          {card.photo ? (
            <img
              src={card.photo}
              alt={card.firstName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-xl font-bold">
              {card.firstName.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{card.firstName}</h3>
            <Badge
              color={card.isPublic ? "success" : "warning"}
              variant="flat"
              size="sm"
            >
              {card.isPublic ? "Public" : "Private"}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            {card.jobTitle} at {card.companyName}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            as={Link}
            to={`/card/${card.id}`}
            isIconOnly
            variant="light"
            aria-label="View card"
          >
            <Icon icon="lucide:eye" className="text-lg" />
          </Button>

          <Button
            as={Link}
            to={`/edit/${card.id}`}
            isIconOnly
            variant="light"
            aria-label="Edit card"
          >
            <Icon icon="lucide:edit" className="text-lg" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            color="danger"
            aria-label="Delete card"
            onPress={() => onDelete(card.id)}
          >
            <Icon icon="lucide:trash" className="text-lg" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
