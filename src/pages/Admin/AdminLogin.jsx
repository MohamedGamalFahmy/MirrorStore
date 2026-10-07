import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (error) {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          GF For Glass
        </h1>

        <p className="text-center text-gray-500 mb-8">
          تسجيل دخول الإدارة
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>

            <label className="block mb-2">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl p-3 outline-none focus:border-black"
            />

          </div>

          <div>

            <label className="block mb-2">
              كلمة المرور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl p-3 outline-none focus:border-black"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-xl p-3 hover:bg-zinc-800 duration-300"
          >
            {loading ? "جاري تسجيل الدخول..." : "دخول"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;