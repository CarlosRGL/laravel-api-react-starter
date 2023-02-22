<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller {

	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		return UserResource::collection( User::query()->orderBy( 'id', 'desc' )->paginate( 10 ) );
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param StoreUserRequest $request Request.
	 */
	public function store( StoreUserRequest $request ) {
		$data             = $request->validated();
		$data['password'] = bcrypt( $data['password'] );
		$user             = User::create( $data );

		return response( new UserResource( $user ), 201 );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param User $user User.
	 */
	public function show( User $user ) {
		return new UserResource( $user );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param UpdateUserRequest $request Request.
	 * @param User              $user User.
	 */
	public function update( UpdateUserRequest $request, User $user ) {
		$data = $request->validated();

		if ( ! isset( $data['password'] ) ) {
			unset( $data['password'] );
		} else {
			$data['password'] = bcrypt( $data['password'] );
		}

		$user->update( $data );

		return response( new UserResource( $user ), 200 );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param User $user User.
	 */
	public function destroy( User $user ) {
		$user->delete();
		return response( null, 204 );
	}
}
