<?php

use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello, World!']);
});

Route::post('/files', [FileController::class, 'store']);

Route::get('/files', [FileController::class, 'index']);

Route::delete('/files/{id}', [FileController::class, 'delete']);
