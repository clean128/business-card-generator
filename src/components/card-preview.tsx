import { Icon } from "@iconify/react";
import { CardFormData } from "../types/card";
import ContactItem from "./contact-item";
import SocialLinks from "./social-links";

interface CardPreviewProps {
  data: CardFormData;
  cardRef: React.RefObject<HTMLDivElement>;
}

export function CardPreview({ data, cardRef }: CardPreviewProps) {
  if (!data.photo) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
        <Icon icon="lucide:image" className="w-16 h-16 mx-auto text-gray-300" />
        <p className="mt-4 text-gray-500">
          Preview will appear after you upload a profile photo
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header with photo */}
        <div className="w-full h-48 sm:h-72 relative mb-5">
          {data.photo && (
            <div className="flex flex-col">
              <img
                src={data.photo}
                alt={data.firstName}
                className="w-full object-cover h-48 sm:h-72 object-center"
                style={{
                  minHeight: "200px",
                }}
              />
              <div
                className="w-full h-5"
                style={{ backgroundColor: data.color }}
              />
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="px-8 py-5">
          {/* Name and title */}
          <div className="text-center mb-4">
            {data.firstName || data.lastName || data.accreditations ? (
              <h2 className="text-3xl font-bold">
                {data.firstName + " " + data.lastName}
                {"  "}
                {data.accreditations && (
                  <span className="text-gray-500 font-normal text-lg">
                    {data.accreditations}
                  </span>
                )}
              </h2>
            ) : null}
            <p className="text-xl" style={{ color: data.color }}>
              {data.jobTitle}
              {"  "}
              {data.department && (
                <span className="text-gray-500">• {data.department}</span>
              )}
            </p>
            <h3 className="text-xl font-bold text-gray-700 mt-1">
              {data.companyName}
            </h3>
          </div>

          {/* Tagline */}
          {data.companySlogan && (
            <p className="text-center italic mb-3">"{data.companySlogan}"</p>
          )}

          {/* CTA Button */}
          <div className="flex justify-center mb-5">
            {data.ctaLabel ? (
              <a
                href={data.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-lg font-medium rounded-md text-white "
                style={{ backgroundColor: data.color }}
              >
                <Icon icon="lucide:calendar" className="size-5" />
                {data.ctaLabel}
              </a>
            ) : data.calendlyLink ? (
              <a
                href={`https://calendly.com/${data.calendlyLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-lg font-medium rounded-md text-white "
                style={{ backgroundColor: data.color }}
              >
                <Icon icon="lucide:calendar" className="size-5" />
                Schedule Meeting
              </a>
            ) : null}
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            {data.phoneNumber && (
              <ContactItem
                href={`tel:${data.phoneNumber}`}
                icon="lucide:phone"
                label="Phone"
                value={data.phoneNumber}
                color={data.color}
              />
            )}

            {data.emailAddress && (
              <ContactItem
                href={`mailto:${data.emailAddress}`}
                icon="lucide:mail"
                label="Email"
                value={data.emailAddress}
                color={data.color}
              />
            )}

            {data.websiteUrl && (
              <ContactItem
                href={data.websiteUrl}
                icon="lucide:globe"
                label="Website"
                value={data.websiteUrl}
                color={data.color}
              />
            )}

            {(data.address.street ||
              data.address.state ||
              data.address.zip ||
              data.address.city ||
              data.address.country) && (
              <ContactItem
                icon="lucide:map-pin"
                label="Address"
                value={[
                  data.address.street,
                  data.address.state,
                  data.address.zip,
                ]
                  .filter(Boolean)
                  .join(", ")}
                color={data.color}
              />
            )}
          </div>

          {/* About section */}
          {data.about && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                About Me
              </h4>
              <p className="text-gray-600 leading-relaxed">{data.about}</p>
            </div>
          )}

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-5">
            <SocialLinks socialLinks={data.socialLinks} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 text-center text-xs text-gray-500 border-t">
          Created free by: https://digipromoting.com
        </div>
      </div>
    </div>
  );
}
