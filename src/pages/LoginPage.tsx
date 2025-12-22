import React, { useState } from "react";
import axios from "axios";

// 1. method nya apa: POST
// 2. endpoint nya apa: /login
// 3. body nya apa: { username: 'admin', password: 'admin' }
// 4. example response
// {
//   "message": "Login berhasil",
//   "token": "ajksdnakjsdnakjsdnaskdjnaskjdnaskjdnd"
// }

const loginApi = async (username: string, password: string) => {
  const response = await axios.post('http://localhost:5000/login', { username, password });
  return response.data;
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async () => {
    await loginApi(username, password).then(
      (response: any) => alert(response.token),
      (error: any) => alert(error.response.data.message)
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default LoginPage;