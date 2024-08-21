import { logger } from "@/lib/logger";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;
logger(error)
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div>
        <pre>STATUS - {error.statusText}</pre>
        <pre>MESSAGE - {error.message}</pre>
        <pre>DATA - {error.data}</pre>
      </div>
    </div>
  );
}
