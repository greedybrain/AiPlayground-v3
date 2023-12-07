// Import the PrismaClient class from the Prisma ORM package to interact with the database.
import { PrismaClient } from "@prisma/client";

// Type-cast the globalThis object to have a 'prisma' property for TypeScript awareness.
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Export a singleton instance of PrismaClient for database operations.
export const db =
    // Check if an instance of PrismaClient already exists in the global scope
    // and reuse it if available; otherwise, create a new instance.
    globalForPrisma.prisma ??
    new PrismaClient({
        // Configure logging based on the environment.
        // In development, log both errors and warnings.
        // In other environments (such as production), log only errors.
        log:
            process.env.NODE_ENV === "development"
                ? ["error", "warn", "query"]
                : ["error"],
    });

// In non-production environments, assign the PrismaClient instance to the global scope
// to ensure the same instance is reused across the application.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
