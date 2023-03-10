<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest {

	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
	 */
	public function rules(): array {
		return array(
			'name'     => 'required|string|max:55',
			'email'    => 'required|email|unique:users,email',
			'password' => array(
				'required',
				'string',
				'min:8',
				Password::min( 8 )->letters()->numbers(),
			),
		);
	}
}
