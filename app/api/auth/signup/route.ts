import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Signup schema
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
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
    const validatedData = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = users.find((u) => u.email === validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create a new user (in a real app, save to database)
    const newUser = {
      id: `${users.length + 1}`,
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name || '',
    };

    // Add the user to our "database"
    users.push(newUser);

    // Create a JWT token
    // In a real app, you'd use a proper secret key from environment variables
    const secret = new TextEncoder().encode('your-secret-key');
    const token = await new SignJWT({ userId: newUser.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    // Return the user data and token (excluding password)
    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid request data', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
}