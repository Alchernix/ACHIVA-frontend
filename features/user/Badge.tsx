import { GoldBadge, SilverBadge, BronzeBadge } from "@/components/Badges";

type BadgeProps = {
  type: string;
  count: number;
};

export default function Badge({ type, count }: BadgeProps) {
  let badgeIcon;
  let labelColor;
  switch (type) {
    case "Gold":
      badgeIcon = <GoldBadge />;
      labelColor = "#EAB021";
      break;
    case "Silver":
      badgeIcon = <SilverBadge />;
      labelColor = "#7F7F7F";
      break;
    case "Bronze":
      badgeIcon = <BronzeBadge />;
      labelColor = "#B2785A";
      break;
  }
  return (
    <div
      style={{
        boxShadow:
          "0 0 14.962px -9.974px rgba(0, 0, 0, 0.10), 18.951px 50.87px 14.962px 0 rgba(65, 42, 41, 0.00), 11.969px 32.916px 13.964px 0 rgba(65, 42, 41, 0.01), 6.982px 18.951px 11.969px 0 rgba(65, 42, 41, 0.03), 2.992px 7.98px 8.977px 0 rgba(65, 42, 41, 0.04), 0.997px 1.995px 4.987px 0 rgba(65, 42, 41, 0.05)",
      }}
      className="flex-1 p-2 flex flex-col items-center bg-white rounded-sm"
    >
      {badgeIcon}
      <p className="font-bold -translate-y-2">{type}</p>
      <p
        style={{ backgroundColor: `${labelColor}26`, color: labelColor }}
        className={`w-full font-semibold text-center rounded-md py-1`}
      >
        {count}
      </p>
    </div>
  );
}
