"use client";

import useCheckAuth from "@/hooks/common/useCheckAuth";
export default function Provider({ children }: { children: React.ReactNode }) {
  // const [mounted, setMouted] = useState<boolean>(false);

  useCheckAuth();
  // useEffect(() => {
  //   return () => setMouted(true);
  // }, []);

  return <>{children}</>;
}
