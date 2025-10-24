import { prisma } from "../server.js";

// User signup: create a new user
export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json({ name: name, email: email });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

// User login: find user and authenticate
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { password }],
      },
    });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};
