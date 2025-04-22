import ReceivedPacket from "./ReceivedPacket";
import SentPacket from "./SentPackets";

export const packetTabs = [
  {
    tablist: "Sent",
    component: (data, equityId) => (
      <SentPacket HOME__OWNERS__PACKETS={data} equityId={equityId} />
    ),
  },
  {
    tablist: "Received",
    component: (data) => <ReceivedPacket HOME__OWNERS__PACKETS={data} />,
  },
];
