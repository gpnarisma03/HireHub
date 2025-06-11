<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate input first
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Check if user with given email exists
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // Email does not exist
            return response()->json([
                'success' => false,
                'message' => 'Email does not exist',
            ], 401);
        }

        // Email exists, check password
        if (!Hash::check($request->password, $user->password)) {
            // Password incorrect
            return response()->json([
                'success' => false,
                'message' => 'Password is incorrect',
            ], 401);
        }

        // Both email and password are correct
        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'access_token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }
}
