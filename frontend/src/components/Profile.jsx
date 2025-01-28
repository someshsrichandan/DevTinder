import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"

const Profile = () => {
  const profileData = useSelector((store) => store.user);
  return (
    <div><EditProfile profile={profileData}/></div>
  )
}

export default Profile