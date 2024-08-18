import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div>
        <pre>{error.statusText}</pre>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
}
