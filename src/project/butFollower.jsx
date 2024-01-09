import { useContext, useEffect, useState } from "react";
import Button from "../components/button";
import { AuthContext } from "../context/AuthContext";
import instanceApi from "../api/instancePrivate";

function ButFollower({ userData }) {
  const { user } = useContext(AuthContext);
  const [isFollowings, setIsFollowings] = useState(false);
  const [debounce, setDebounce] = useState(false);

  const { instancePriv } = instanceApi();

  useEffect(() => {
    const checkFollow = userData.followers.find((elm) => elm.id == user.id);
    if (checkFollow) setIsFollowings(true);
  }, []);

  const fetchFollow = async () => {
    if (!debounce) {
      try {
        setDebounce(true);
        setIsFollowings(!isFollowings);
        await instancePriv.post("/isfollow", {
          userName: userData.userName,
          name: userData.name,
          id: userData._id,
        });
        setTimeout(() => {
          setDebounce(false);
        }, 300);
      } catch (error) {
        console.log("Deu erro" + error);
        setDebounce(false);
      }
    }
  };

  return (
    <>
      {user.id != userData._id && (
        <Button
          text={isFollowings ? "Seguindo" : "Seguir"}
          handleClick={() => fetchFollow()}
        />
      )}
    </>
  );
}

export default ButFollower;