import React from "react";
import { Link } from "react-router-dom";
import { Button, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CardListItem } from "../components/card-list-item";
import { useCards } from "../hooks/use-cards";
import { useAuth } from "../context/auth-context";

export default function DashboardPage() {
  const { cards, deleteCard } = useCards();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState("all");
  
  const publicCards = cards.filter(card => card.isPublic);
  const privateCards = cards.filter(card => !card.isPublic);
  
  const displayCards = React.useMemo(() => {
    switch (activeTab) {
      case "public":
        return publicCards;
      case "private":
        return privateCards;
      default:
        return cards;
    }
  }, [activeTab, cards, publicCards, privateCards]);
  
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCard(id);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Business Cards</h1>
        <Button
          as={Link}
          to="/"
          color="primary"
          startContent={<Icon icon="lucide:plus" />}
        >
          Create New Card
        </Button>
      </div>
      
      {!user && (
        <div className="bg-warning-50 border border-warning-200 p-4 rounded-lg mb-6">
          <p className="text-warning-700">
            <Icon icon="lucide:alert-triangle" className="inline mr-2" />
            You are not signed in. Your cards are stored locally and will be lost if you clear your browser data.
            <Link to="/signup" className="ml-2 underline">Sign up</Link> or <Link to="/login" className="underline">log in</Link> to save your cards.
          </p>
        </div>
      )}
      
      <Tabs 
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Card filters"
        className="mb-6"
      >
        <Tab 
          key="all" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:credit-card" />
              <span>All Cards ({cards.length})</span>
            </div>
          }
        />
        <Tab 
          key="public" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:globe" />
              <span>Public ({publicCards.length})</span>
            </div>
          }
        />
        <Tab 
          key="private" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:lock" />
              <span>Private ({privateCards.length})</span>
            </div>
          }
        />
      </Tabs>
      
      {displayCards.length === 0 ? (
        <div className="text-center py-12">
          <Icon icon="lucide:credit-card" className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No cards found</h2>
          <p className="text-gray-500 mb-6">
            {activeTab === "all"
              ? "You haven't created any business cards yet."
              : `You don't have any ${activeTab} cards.`}
          </p>
          <Button
            as={Link}
            to="/"
            color="primary"
            startContent={<Icon icon="lucide:plus" />}
          >
            Create Your First Card
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayCards.map((card) => (
            <CardListItem
              key={card.id}
              card={card}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}