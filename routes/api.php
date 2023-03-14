<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(
	array(
		'prefix'     => 'v1',
		'middleware' => 'auth:sanctum',
	),
	function () {
		Route::post( 'logout', array( AuthController::class, 'logout' ) );
		Route::get(
			'/user',
			function ( Request $request ) {
				return $request->user();
			}
		);
		Route::get( '/users/search/{search}', array( UserController::class, 'search' ) );
		Route::apiResource( '/users', UserController::class );
	}
);

Route::group(
	array(
		'prefix'     => 'v1',
		'middleware' => 'api',
	),
	function () {
		Route::post( 'signup', array( AuthController::class, 'signup' ) );
		Route::post( 'login', array( AuthController::class, 'login' ) );
	}
);
