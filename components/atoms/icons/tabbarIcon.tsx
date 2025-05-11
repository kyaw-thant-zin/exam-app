import { Home, MessageCircle, Search, User } from "@/components/atoms/icons";

export type RouteName = "index" | "explore" | "chat" | "profile";

export const icon: Record<
  RouteName,
  (props: { className: string }) => JSX.Element
> = {
  index: (props) => <Home size={20} strokeWidth={2.5} {...props} />,
  explore: (props) => <Search size={22} strokeWidth={2.5} {...props} />,
  chat: (props) => <MessageCircle size={22} strokeWidth={2.5} {...props} />,
  profile: (props) => <User size={22} strokeWidth={2.5} {...props} />
};
