import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authorizeToken, loginWithEmailAndPassword, registerUser } from "@/lib/api"

export default function AuthModal({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [emailOrToken, setEmailOrToken] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = async () => {
    if (!emailOrToken.trim()) return

    setLoading(true)
    try {
      let data
      let token = ""

      if (isRegistering) {
        if (!name.trim() || !password.trim() || !emailOrToken.includes("@")) {
          alert("Preencha nome, e-mail válido (com @) e senha para registrar")
          setLoading(false)
          return
        }
        data = await registerUser({ name, email: emailOrToken, password })
        token = data.access_token
      } else {
        data = await authorizeToken(emailOrToken)
        token = data.access_token
      }

      if (token) {
        localStorage.setItem("accessToken", token)
        localStorage.setItem("userName", data.name || "")
        localStorage.setItem("userEmail", data.email || "")
        localStorage.setItem("userApplication", data.aplication || "")
        onAuthenticated()
      }
    } catch {
      alert("Credenciais inválidas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-[768px] h-[480px] bg-white shadow-2xl rounded-xl flex relative overflow-hidden">

        <div className={`w-1/2 p-8 z-20 transition-opacity duration-500 ${isRegistering ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="space-y-4">
            <Input
              placeholder="E-mail"
              value={emailOrToken}
              onChange={(e) => setEmailOrToken(e.target.value)}
            />

            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-gray-500 text-sm">ou</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => alert("Login com Google")}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition"
              >
                <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Entrar com Google</span>
              </button>

              <button
                onClick={() => alert("Login com GitHub")}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition"
              >
                <img src="/github-logo.png" alt="GitHub" className="w-5 h-5" />
                <span className="text-sm">Entrar com GitHub</span>
              </button>
            </div>
            <Button
              variant="link"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-center"
            >Não tem conta? Cadastre-se
            </Button>

          </div>
        </div>

        <div className={`w-1/2 p-8 z-20 transition-opacity duration-500 ${isRegistering ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-2xl font-bold mb-4">Registrar</h2>
          <div className="space-y-3">
            <Input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="E-mail"
              value={emailOrToken}
              onChange={(e) => setEmailOrToken(e.target.value)}
            />

            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Registrar"}
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-gray-500 text-sm">ou</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => alert("Login com Google")}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition"
              >
                <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Registrar com Google</span>
              </button>

              <button
                onClick={() => alert("Login com GitHub")}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition"
              >
                <img src="/github-logo.png" alt="GitHub" className="w-5 h-5" />
                <span className="text-sm">Registrar com GitHub</span>
              </button>
            </div>

            <Button
              variant="link"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-center"
            >Já tem conta? Entre
            </Button>
          </div>
        </div>

        <div className={`
          absolute top-0 h-full w-1/2 bg-stone-950 text-white flex flex-col items-center justify-center
          transition-transform duration-500 z-10 rounded-xl gap-4
          ${isRegistering ? 'translate-x-0 left-0' : 'translate-x-full left-0'}
        `}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold">Bill Manager</h1>
            <h3 className="text-lg"> Seu gestor de pagamentos</h3>
          </div>

          {/* <h2 className="text-xl font-semibold">
            {isRegistering ? 'Login inativo' : 'Registro inativo'}
          </h2> */}
          <img src="/logo.png" alt="Logo" width={200} />
        </div>
      </div>
    </div>
  );
}
