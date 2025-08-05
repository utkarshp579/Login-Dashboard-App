// server.js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;
const JWT_SECRET = "your-secret-key-change-in-production";

// Enable CORS
app.use(cors());
app.use(express.json());

// In-memory database (replace with real database in production)
let users = [
  {
    id: "1",
    username: "testuser",
    email: "test@gmail.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7.9GzOtdtu", // hashed: 1234567989
    role: "sailor",
    confirmed: true,
    createdAt: new Date().toISOString(),
  },
];

let userDb = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    department: "Engineering",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "sailor",
    department: "Operations",
    status: "active",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "sailor",
    department: "Maintenance",
    status: "inactive",
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "captain",
    department: "Navigation",
    status: "active",
    joinDate: "2023-01-05",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "sailor",
    department: "Engineering",
    status: "active",
    joinDate: "2023-04-12",
  },
];

// GraphQL Schema
const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    role: Role
    confirmed: Boolean!
    createdAt: String!
  }

  type Role {
    name: String!
  }

  type AuthPayload {
    jwt: String!
    user: User!
  }

  type UserDbEntry {
    id: ID!
    name: String!
    email: String!
    role: String!
    department: String!
    status: String!
    joinDate: String!
  }

  input UsersPermissionsLoginInput {
    identifier: String!
    password: String!
  }

  input UsersPermissionsRegisterInput {
    username: String!
    email: String!
    password: String!
    role: String
    confirmed: Boolean
  }

  type Query {
    me: User
    userDb: [UserDbEntry!]!
  }

  type Mutation {
    login(input: UsersPermissionsLoginInput!): AuthPayload!
    register(input: UsersPermissionsRegisterInput!): AuthPayload!
  }
`);

// Helper functions
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const getUserFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return users.find((user) => user.id === decoded.id);
  } catch (error) {
    return null;
  }
};

// GraphQL Resolvers
const root = {
  // Queries
  me: ({}, { token }) => {
    const user = getUserFromToken(token);
    if (!user) {
      throw new Error("Not authenticated");
    }
    return {
      ...user,
      role: { name: user.role },
    };
  },

  userDb: ({}, { token }) => {
    const user = getUserFromToken(token);
    if (!user) {
      throw new Error("Not authenticated");
    }
    return userDb;
  },

  // Mutations
  login: async ({ input }) => {
    const { identifier, password } = input;

    // Find user by username or email
    const user = users.find(
      (u) => u.username === identifier || u.email === identifier
    );

    if (!user) {
      console.log(user);
      throw new Error("Invalid credentials");
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      // console.log(password, user.password);
      throw new Error("Invalid credentials");
    }

    // Generate token
    const token = generateToken(user);

    return {
      jwt: token,
      user: {
        ...user,
        role: { name: user.role },
      },
    };
  },

  register: async ({ input }) => {
    const {
      username,
      email,
      password,
      role = "sailor",
      confirmed = true,
    } = input;

    // Check if user already exists
    const existingUser = users.find(
      (u) => u.username === username || u.email === email
    );
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      username,
      email,
      password: hashedPassword,
      role,
      confirmed,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // Generate token
    const token = generateToken(newUser);

    return {
      jwt: token,
      user: {
        ...newUser,
        role: { name: newUser.role },
      },
    };
  },
};

// Middleware to extract token from headers
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    req.token = token;
  }
  next();
};

app.use(authMiddleware);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema: schema,
    rootValue: root,
    context: { token: req.token },
    graphiql: false, // Enable GraphiQL interface
  }))
);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`🔍 GraphiQL interface: http://localhost:${PORT}/graphql`);
  console.log("\n📝 Test Credentials:");
  console.log("Username: testuser");
  console.log("Email: test@gmail.com");
  console.log("Password: 1234567989");
});

module.exports = app;
