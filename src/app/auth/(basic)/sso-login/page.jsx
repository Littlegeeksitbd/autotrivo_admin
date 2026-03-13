import { Suspense } from "react";
import SSOLogin from "./component/SSOLogin";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SSOLogin />
    </Suspense>
  );
}