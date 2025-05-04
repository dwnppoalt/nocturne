import { useParams } from "react-router-dom";

export default function NotePage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Viewing Note ID: {id}</h1>
    </div>
  );
}
