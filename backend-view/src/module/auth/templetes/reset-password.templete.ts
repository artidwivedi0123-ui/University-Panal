export const resetPasswordTemplate = (
  name: string,
  resetLink: string
) => {
  return `
    <h2>Hello ${name}</h2>

    <p>You requested password reset.</p>

    <a href="${resetLink}">
      Reset Password
    </a>

    <p>This link expires in 15 minutes.</p>
  `;
};