<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function insertUser(Request $request)
    {
        try {
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'middle_initial' => ['nullable', 'string', 'max:1', 'regex:/^[a-zA-Z]$/'],
                'last_name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'mobile_number' => 'required|string|max:20|unique:users,mobile_number',
                'password' => 'required|string|min:6',
                'role' => 'required|in:admin,employer,employee',
            ], [
                'first_name.required' => 'First name is required.',
                'first_name.string' => 'First name must be a string.',
                'first_name.max' => 'First name must not exceed 255 characters.',
                'middle_initial.string' => 'Middle initial must be a string.',
                'middle_initial.max' => 'Middle initial must be only 1 character.',
                'middle_initial.regex' => 'Middle initial must be a single alphabet character.',
                'last_name.required' => 'Last name is required.',
                'last_name.string' => 'Last name must be a string.',
                'last_name.max' => 'Last name must not exceed 255 characters.',
                'email.required' => 'Email address is required.',
                'email.email' => 'Please provide a valid email address.',
                'email.unique' => 'This email address is already taken.',
                'mobile_number.required' => 'Mobile number is required.',
                'mobile_number.string' => 'Mobile number must be a string.',
                'mobile_number.max' => 'Mobile number must not exceed 20 characters.',
                'mobile_number.unique' => 'This Mobile number is already used.',
                'password.required' => 'Password is required.',
                'password.string' => 'Password must be a string.',
                'password.min' => 'Password must be at least 6 characters long.',
                'role.required' => 'Role is required.',
                'role.in' => 'Role must be one of: admin, employer, or employee.',
            ]);

            $user = User::create([
                'first_name' => $validated['first_name'],
                'middle_initial' => $validated['middle_initial'] ?? null,
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'mobile_number' => $validated['mobile_number'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'user' => $user,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }

        public function getUserDetails(Request $request)
    {
        // $request->user() returns the authenticated user via Sanctum
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }

    public function getAllUsers()
    {
        $users = User::all();

        return response()->json([
            'success' => true,
            'users' => $users,
        ]);
    }

}
