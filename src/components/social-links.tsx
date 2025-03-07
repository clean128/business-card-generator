import { Icon } from "@iconify/react";

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

export default function SocialLinks({
  socialLinks,
}: {
  socialLinks: Record<string, string>;
}) {
  const socialConfig: Record<string, { icon: string }> = {
    linkedin: { icon: "lucide:linkedin" },
    twitter: { icon: "lucide:twitter" },
    facebook: { icon: "lucide:facebook" },
    youtube: { icon: "lucide:youtube" },
    instagram: { icon: "lucide:instagram" },
    tiktok: { icon: "mingcute:tiktok-line" },
  };

  return (
    <>
      {Object.entries(socialLinks).map(([platform, url]) => {
        if (!url || !socialConfig[platform]) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-textColor rounded-full p-2 text-bgColor"
          >
            <Icon icon={socialConfig[platform].icon} className="w-6 h-6" />
          </a>
        );
      })}
    </>
  );
}
