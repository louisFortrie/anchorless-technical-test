<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index()
    {
        return response()->json(['files' => []], 200);
    }
    public function store(Request $request)
    {
        $request->validate(['file' => 'required|file',]);
        $file = $request->file('file');
        $path = $file->store('uploads');
        return response()->json(['path' => $path], 201);
    }
    public function update(Request $request, $id)
    {
        $file = $request->file('file');
        $path = $file->store('uploads');
        return response()->json(['path' => $path], 200);
    }
    public function delete($id)
    {
        return response()->json(['message' => 'File deleted'], 204);
    }
}
