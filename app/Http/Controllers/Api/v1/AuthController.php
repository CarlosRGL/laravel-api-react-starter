<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {

	public function signup( SignupRequest $request ) {
		$data = $request->validated();
		$user = User::create(
			array(
				'name'     => $data['name'],
				'email'    => $data['email'],
				'password' => bcrypt( $data['password'] ),
			)
		);

		$token = $user->createToken( 'main' )->plainTextToken;

		return response( compact( 'user', 'token' ) );
	}

	public function login( LoginRequest $request ) {
		$credentials = $request->validated();

		if ( ! Auth::attempt( $credentials ) ) {
			return response( array( 'message' => 'Invalid login details' ), 422 );
		}
		/** @var User $user user */
		$user  = Auth::user();
		$token = $user->createToken( 'main' )->plainTextToken;

		return response( compact( 'user', 'token' ) );
	}

	public function logout( Request $request ) {
		/** @var User $user user */
		$user = $request->user();
		$user->currentAccessToken()->delete();

		return response( array( 'message' => 'Logged out' ), 200 );
	}
}
