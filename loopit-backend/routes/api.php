<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Route::get('/cars',[CarController::class,'index']);
//Route::post('/cars',[CarController::class,'store']);
//Route::resource('cars',CarController::class);
//Route::get('/cars/search/{name}',[CarController::class,'search']);


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
//protected routs
Route::group(['middleware'=>['auth:sanctum']], function () {
   // Route::resource('cars',CarController::class);
    Route::get('/cars',[CarController::class,'index']);
    Route::get('/cars/search/{name}',[CarController::class,'search']);
    Route::post('/logout',[AuthController::class,'logout']);
});



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
