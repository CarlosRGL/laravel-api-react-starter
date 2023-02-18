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
	 */
	public function store( StoreUserRequest $request ) {
		$data = $request->validated();
		$user = User::create(
			array(
				'name'     => $data['name'],
				'email'    => $data['email'],
				'password' => bcrypt( $data['password'] ),
			)
		);

		return response( new UserResource( $user ), 201 );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( User $user ) {
		return new UserResource( $user );
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateUserRequest $request, User $user ) {
		$data = $request->validated();

		$user->update(
			array(
				'name'     => $data['name'],
				'email'    => $data['email'],
				'password' => bcrypt( $data['password'] ),
			)
		);

		return response( new UserResource( $user ), 200 );
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( User $user ) {
		$user->delete();
		return response( null, 204 );
	}
}