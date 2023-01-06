import { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChangePasswordHandler = () => {
    axios
      .put(
        `http://localhost:3001/auth/changepassword`,
        { oldPassword, newPassword },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        alert(response.data.err);
      });
  };
  return (
    <div>
      <h1>Şifre Değiştir</h1>
      <input
        type="text"
        placeholder="Eski Şifre"
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Yeni Şifre"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={onChangePasswordHandler}> Değiştir </button>
    </div>
  );
};

export default ChangePassword;
