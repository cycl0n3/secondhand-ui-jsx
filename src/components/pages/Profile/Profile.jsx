import { useContext, useState } from "react";

import { Input } from "@chakra-ui/react";

import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [file, setFile] = useState(null);

  return (
    <div>
      <h1>Profile</h1>
      
      {user && <>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </>}
      
      <Input type="file" onChange={
        (e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }
      } />
    </div>
  );
}

export default Profile;
