<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobCategoryController extends Controller
{
    // Only admin can access these routes
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:admin']);
    }

    // Add a new category
    public function addCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|unique:job_categories,category_name|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = JobCategory::create([
            'category_name' => $request->category_name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category added successfully',
            'category' => $category,
        ], 201);
    }

    // Update a category by ID
    public function updateCategory(Request $request, $id)
    {
        $category = JobCategory::find($id);
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|max:255|unique:job_categories,category_name,' . $id . ',category_id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $category->category_name = $request->category_name;
        $category->save();

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'category' => $category,
        ]);
    }

    // Delete a category by ID
    public function deleteCategory($id)
    {
        $category = JobCategory::find($id);
        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ]);
    }

    // Get all categories
    public function getAllCategories()
    {
        $categories = JobCategory::all();

        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }
}
