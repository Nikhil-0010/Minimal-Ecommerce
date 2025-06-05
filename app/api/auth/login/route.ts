import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// In a real app, this would be stored in a database
const users = [
  {
    id: '1',
    email: 'user@example.com',
    // Password: password123
    password: '$2a$10$8Lq1xNgMXcGo5BuDgbhvAuuC3jYhUoR5iH/KbP.ByXrqpOqTsF/T2',
    name: 'Demo User',
  },
];

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find the user by email
    const user = users.find((u) => u.email === validatedData.email);
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create a JWT token
    // In a real app, you'd use a proper secret key from environment variables
    const secret = new TextEncoder().encode('your-secret-key');
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    // Return the user data and token
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid request data', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}