import { api } from "@/utils/api";
import { Edit } from "lucide-react";
import { useState } from "react";

export function EditableBio({
  bio,
  canEdit,
}: {
  bio: string;
  canEdit: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(bio);

  // display a text area so that users can change their bio.
  if (isEditing) {
    return (
      <BioEditor
        bio={updatedBio}
        setIsEditing={setIsEditing}
        setUpdatedBio={setUpdatedBio}
      />
    );
  }

  // display the bio.
  // If the can are the profile owner they can see the edit button.
  return (
    <div className="flex">
      <p>About: {updatedBio}</p>
      {canEdit && (
        <button onClick={() => setIsEditing(!isEditing)}>
          <Edit size={24}></Edit>
        </button>
      )}
    </div>
  );
}

type BioEditorProps = {
  bio: string;
  setIsEditing: (isEditing: boolean) => void;
  setUpdatedBio: (bio: string) => void;
};

export function BioEditor({
  bio,
  setIsEditing,
  setUpdatedBio,
}: BioEditorProps) {
  const [newBio, setNewBio] = useState(bio);
  const { mutate, error } = api.profile.updateBio.useMutation();

  const update = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ bio: newBio });
    setIsEditing(false);
    setUpdatedBio(newBio);
    console.log("Updating bio to: ", newBio);
  };

  return (
    <form onSubmit={(e) => update(e)}>
      <textarea
        onChange={(e) => setNewBio(e.target.value)}
        value={newBio}
      ></textarea>
      {error && <div>Error updating bio: {error.message}</div>}
      <button>Save</button>
    </form>
  );
}
