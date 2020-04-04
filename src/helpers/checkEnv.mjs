export const checkEnv = (variables) => {
  const missingVars = [];

  variables.forEach((variable) => {
    if (!process.env[variable]) {
      missingVars.push(variable);
    }
  });

  if (missingVars.length) {
    if (missingVars.length === 1) {
      throw new Error(`Missing environment variable: ${missingVars[0]}`);
    }
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }
};
