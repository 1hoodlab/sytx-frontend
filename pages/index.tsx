import dynamic from "next/dynamic";
const TerminalComponent = dynamic(
  () => import("../components/terminal/terminal.component"),
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <div>
      <TerminalComponent />
    </div>
  );
}
