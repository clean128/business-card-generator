import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CardPreview } from "../components/card-preview";
import { DEFAULT_CARD_DATA } from "../constants/global";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            Create Your Digital Business Card
          </h1>
          <p className="text-xl mb-6">
            Free digital business cards that are easy to create, share, and use.
            No app downloads required.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              as={Link}
              to="/"
              color="primary"
              size="lg"
              startContent={<Icon icon="lucide:plus" />}
            >
              Create New Card
            </Button>

            <Button
              as={Link}
              to="/dashboard"
              variant="bordered"
              size="lg"
              startContent={<Icon icon="lucide:layout-dashboard" />}
            >
              View Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-2 bg-primary-100 rounded-full">
                  <Icon icon="lucide:zap" className="text-2xl text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Quick Setup</h3>
                  <p className="text-sm text-gray-500">
                    Create your card in minutes
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-2 bg-primary-100 rounded-full">
                  <Icon icon="lucide:share" className="text-2xl text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Easy Sharing</h3>
                  <p className="text-sm text-gray-500">
                    Share via link or QR code
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-2 bg-primary-100 rounded-full">
                  <Icon
                    icon="lucide:smartphone"
                    className="text-2xl text-primary"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Mobile Friendly</h3>
                  <p className="text-sm text-gray-500">Works on all devices</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-2 bg-primary-100 rounded-full">
                  <Icon
                    icon="lucide:palette"
                    className="text-2xl text-primary"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Customizable</h3>
                  <p className="text-sm text-gray-500">
                    Make it match your brand
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <CardPreview data={DEFAULT_CARD_DATA} />
        </div>
      </div>
    </div>
  );
}
