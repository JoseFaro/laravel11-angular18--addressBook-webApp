<?php

use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('contacts')->group(function() {
    Route::get('/', [ContactController::class, 'index']);
    Route::get('/show/{id}', [ContactController::class, 'show']);
    Route::post('/store', [ContactController::class, 'store']);
    Route::post('/update/{id}', [ContactController::class, 'update']);
    Route::post('/destroy', [ContactController::class, 'destroy']);
});