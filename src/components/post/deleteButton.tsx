import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

type Props = {
  pid: string;
  profile: string;
};

export default function DeleteButton({ pid, profile }: Props) {
  const { mutate, error, status } = api.posts.deletePost.useMutation();
  const router = useRouter();

  const deletePost = (id: string) => {
    mutate({ pid: id });
  };

  if (status === "success") {
    router.push(`/${profile}`).catch(console.error);
  }

  if (error) {
    router.push(`/${profile}?error=${error.message}`).catch(console.error);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deletePost(pid)}
            className={buttonVariants({ variant: "destructive" })}
          >
            Delete forever
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
