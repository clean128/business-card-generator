import { Icon } from "@iconify/react";

interface ContactItemProps {
  href?: string;
  icon: string;
  label: string;
  value: string;
  color: string;
}

export default function ContactItem({
  href,
  icon,
  label,
  value,
  color,
}: ContactItemProps) {
  const content = (
    <>
      <div className="absolute -inset-y-2 w-[200%] -left-8 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out bg-textColor" />
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        <Icon icon={icon} />
      </div>
      <div>
        <p className="font-bold group-hover:text-bgColor text-gray-700">
          {value}
        </p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </>
  );

  return href ? (
    <a href={href} className="relative flex items-center gap-3 group">
      {content}
    </a>
  ) : (
    <div className="relative group flex items-center gap-3">{content}</div>
  );
}
