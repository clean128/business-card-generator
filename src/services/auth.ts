import axios from "axios";

export const signIn = async (email: string, password: string) => {
  await axios.post("http://localhost:5000/signin", {
    email,
    password,
  });
};
