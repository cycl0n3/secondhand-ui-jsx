import "./Profile.css";

import { useContext, useState } from "react";

import { Button, Input, Avatar } from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import { UserContext } from "../../context/UserContext";

import { net } from "../../io/net";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  return (
    <div>
      <h1>Profile</h1>

      {user && (
        <>
          <p>{user.username}</p>
          <p>{user.email}</p>

          {user.picture && (
            <Avatar
              size="xl"
              src={'data:image/png;base64,' + user.picture}
            />
          )}
        </>
      )}

      <Input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <Button
        isLoading={loading}
        onClick={async () => {
          setLoading(true);
          if (file) {
            await new Promise((r) => setTimeout(r, 1000));

            net
              .upload(user, file)
              .then((res) => {
                console.log(res);
                toast({
                  title: "File uploaded.",
                  description: "We've successfully uploaded your file.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .catch((err) => {
                console.log(err);
                toast({
                  title: "File upload failed.",
                  description: "We've failed to upload your file.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }).finally(() => {
                setLoading(false);
              });
          }
        }}
        className="primary"
      >
        Upload
      </Button>
    </div>
  );
};

export default Profile;
