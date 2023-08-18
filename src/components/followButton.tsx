import { api } from "@/utils/api";

type FollowButtonProps = {
  profileId: string;
};

export default function FollowButton({ profileId }: FollowButtonProps) {
  const { mutate, isError } = api.profile.followRequest.useMutation();

  const onClick = () => {
    mutate({ profileId: profileId });
  };

  const styles = isError ? "bg-red" : "";

  return (
    <button onClick={() => onClick()} className={styles}>
      Request to Follow
    </button>
  );
}
