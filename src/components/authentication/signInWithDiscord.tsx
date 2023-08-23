import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignInWithDiscord() {
  return <Button onClick={() => signIn()}>Sign in with Discord</Button>;
}
