<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::prefix('users')->group(function () {
    Route::post('/', [UserController::class, 'insertUser']);
    Route::middleware('auth:sanctum')->get('/', [UserController::class, 'getUserDetails']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware(['auth:sanctum', 'role:admin'])->get('/all', [UserController::class, 'getAllUsers']);

});

Route::prefix('company')->group(function () {
Route::middleware(['auth:sanctum', 'role:employer'])->post('/', [CompanyController::class, 'createCompany']);
    
});

Route::prefix('jobCategory')->group(function () {
    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::post('/', [JobCategoryController::class, 'addCategory']);         // Create
        Route::put('/{id}', [JobCategoryController::class, 'updateCategory']);    // Update
        Route::delete('/{id}', [JobCategoryController::class, 'deleteCategory']); // Delete

    });
    Route::get('/', [JobCategoryController::class, 'getAllCategories']);     // Get all
});


Route::prefix('jobs')->group(function () {
    Route::get('/', [JobController::class, 'index']); // All users can view jobs

    Route::middleware(['auth:sanctum', 'role:employer'])->group(function () {
        Route::post('/', [JobController::class, 'store']);     // Add job (employer only)
        Route::delete('/{id}', [JobController::class, 'destroy']); // Delete job
    });
});


Route::prefix('applications')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [ApplicationController::class, 'apply']);           // Submit application (Job Seeker)
    Route::get('/myApplication', [ApplicationController::class, 'myApplications']); // Get logged-in user's applications
    Route::get('/job/{job_id}', [ApplicationController::class, 'getByJob']); // (Optional) Employer/Admin view
    Route::put('/{id}/status', [ApplicationController::class, 'updateStatus']) // Update status (Admin/Employer)
        ->middleware('role:admin,employer');
});