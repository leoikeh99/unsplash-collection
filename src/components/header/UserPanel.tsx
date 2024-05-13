import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const UserPanel = () => {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p className="sr-only">Open user menu</p>
        <Image
          unoptimized
          src={data?.user?.image || `/assets/user.svg`}
          alt="avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="hidden sm:block">
        <DropdownMenuLabel>{data?.user?.name || "Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserPanel;
