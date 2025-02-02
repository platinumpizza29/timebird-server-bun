import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import userLogin from "./routes/login";
import userRegister from "./routes/register";
import { Elysia } from "elysia";

const app = new Elysia();
const port = Bun.env.PORT || 3000;

// middlewares
app.use(cors())
app.use(swagger())

app.group('/auth', (auth) =>
  auth
    .post('/login', userLogin.handler)    // Added path '/login'
    .post('/register', userRegister.handler)  // Added path '/register'
)

app.listen(port, () => {
  console.log("server started on port", port);
});
