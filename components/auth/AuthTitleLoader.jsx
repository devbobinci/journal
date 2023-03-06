import PulseLoader from "react-spinners/PulseLoader";

export default function AuthTitleLoader({ loader, text }) {
  return (
    <div className="flex items-end gap-2">
      {text}
      <PulseLoader className="pb-1" color={"white"} loading={loader} size={6} />
    </div>
  );
}
