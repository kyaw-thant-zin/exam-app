import {
  QueryClient,
  QueryClientProvider as RQClientProvider
} from "@tanstack/react-query";
import Toaster from "@/components/atoms/ui/toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePlatform } from "@/hooks/usePlatfom";

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 10
  //   }
  // }
});

export default function QueryClientProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { isWeb } = usePlatform();
  return (
    <RQClientProvider client={queryClient}>
      {children}
      <Toaster />
      {isWeb && <ReactQueryDevtools initialIsOpen />}
    </RQClientProvider>
  );
}
