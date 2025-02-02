// routes/login.ts
export default {
  path: '/login',
  handler: async ({ body }: any) => {
    const email = body;
    return { message: "Login successful", email };
  }
}
