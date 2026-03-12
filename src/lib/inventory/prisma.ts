import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient({ log: ['error'] })
}

declare const globalThis: {
    prismaGlobal: PrismaClient | undefined;
} & typeof global;

// Lazy-loaded prisma instance
let _prisma: PrismaClient | undefined;

const getPrisma = (): PrismaClient => {
    if (typeof window !== "undefined") return null as any; // Safety for client-side
    
    if (!_prisma) {
        _prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
    }
    
    if (process.env.NODE_ENV !== 'production') {
        globalThis.prismaGlobal = _prisma;
    }
    
    return _prisma;
}

// Export a proxy to maintain the same import syntax: import prisma from '...'
const prisma = new Proxy({} as PrismaClient, {
    get: (target, prop) => {
        const instance = getPrisma();
        return (instance as any)[prop];
    }
});

export default prisma;
