<?php

namespace App\Http\Services;

use App\Http\Helper\Http;
use App\Http\Services\JwtService;
use App\Models\ResetSellerAccount;
use App\Models\ResetUserAccount;
use App\Models\Seller;
use App\Models\SellerAddress;
use App\Models\SellerInfo;
use App\Models\SellerPhone;
use App\Models\User;
use App\Models\UserAddress;
use App\Models\UserInfo;
use App\Models\UserPhone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Throwable;

class AuthService
{
    /**
     * Summary of seller_register
     * @param \Illuminate\Http\Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function seller_register(Request $req)
    {
        $auth_req = $req->validate([
            'email_address' => 'email|required|max:255',
            'current_password' => 'string|required|max:255|min:6',
        ]);

        $info_req = $req->validate([
            'last_name' => 'string|required|max:255',
            'full_name' => 'string|required|max:255',
            'first_name' => 'string|required|max:255',
            'date_of_birth' => 'date|required'
        ]);

        $address_req = $req->validate([
            'address' => 'array|required',
            'address.*.province'       => 'required|string',
            'address.*.ward'           => 'required|string',
            'address.*.address_detail' => 'required|string',
        ]);

        $phone_req = $req->validate([
            'phones' => 'array|required',
            'phones.*.phone_number' => 'required|string|max:10',
            'phones.*.type' => 'required|string|in:company,individual'
        ]);

        $existing = Seller::where('email_address', '=', $auth_req['email_address'])->exists();

        if ($existing) {
            return Http::warning([
                'message' => 'Existing this email!',
                'success' => false,
                'timestamp' => now()
            ]);
        }

        $hash_password = Hash::make($auth_req['current_password']);
        try {
            DB::beginTransaction();

            $new_seller = Seller::create([
                'email_address' => $auth_req['email_address'],
                'hash_password' => $hash_password
            ]);

            $new_seller_id = $new_seller->id;

            if (!$new_seller_id) {
                return Http::error([
                    'message' => 'Register failed!',
                    'success' => false,
                    'timestamp' => now()
                ]);
            };

            $reset_account_token = ResetSellerAccount::create([
                'email_address' => $auth_req['email_address'],
                'reset_token' => $hash_password
            ]);

            $reset_account_token_id = $reset_account_token->id;

            if (!$reset_account_token_id) {
                return Http::error([
                    'message' => 'Create reset account failed!',
                    'success' => false,
                    'timestamp' => now()
                ]);
            }

            $new_seller_info = SellerInfo::create([
                'seller_id' => $new_seller_id,
                'last_name' => $info_req['last_name'],
                'full_name' => $info_req['full_name'],
                'first_name' => $info_req['first_name'],
                'date_of_birth' => $info_req['date_of_birth']
            ]);

            $new_seller_info_id = $new_seller_info->id;

            if (!$new_seller_info_id) return Http::error([
                'message' => 'Existing this email!',
                'success' => false,
                'timestamp' => now()
            ]);

            $new_address_data = [];
            foreach ($address_req['address'] as $key => $value) {
                $new_address_data[$key] = [
                    'seller_id' => $new_seller_id,
                    'province' => $value['province'],
                    'ward' => $value['ward'],
                    'address_detail' => $value['address_detail'],
                ];
            }
            $new_phone_data = [];
            foreach ($phone_req['phones'] as $key => $value) {
                $new_phone_data[$key] = [
                    'seller_id' => $new_seller_id,
                    'phone_number' => $value['phone_number'],
                    'type' => $value['type']
                ];
            }
            if (!empty($new_address_data)) {
                SellerAddress::insert($new_address_data);
            }

            if (!empty($new_phone_data)) {
                SellerPhone::insert($new_phone_data);
            }

            DB::commit();

            return Http::success([
                'message' => 'Register successfully!',
                'success' => true,
                'timestamp' => now()
            ]);
        } catch (Throwable $error) {
            DB::rollBack();
            return Http::server_error([
                'message' => $error->getMessage(),
                'success' => true,
                'timestamp' => now()
            ]);
        }
    }
    /**
     * Summary of user_register
     * @param \Illuminate\Http\Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function  user_register(Request $req)
    {
        $auth_req = $req->validate([
            'email_address' => 'email|required|max:255',
            'current_password' => 'string|required|max:255|min:6',
        ]);

        $info_req = $req->validate([
            'last_name' => 'string|required|max:255',
            'full_name' => 'string|required|max:255',
            'first_name' => 'string|required|max:255',
            'date_of_birth' => 'date|required'
        ]);

        $address_req = $req->validate([
            'address' => 'array|required',
            'address.*.province'       => 'required|string',
            'address.*.ward'           => 'required|string',
            'address.*.address_detail' => 'required|string',
        ]);

        $phone_req = $req->validate([
            'phones' => 'array|required',
            'phones.*.phone_number' => 'required|string|max:10'
        ]);

        $existing = User::where('email_address', '=', $auth_req['email_address'])->exists();

        if ($existing) {
            return Http::warning([
                'message' => 'Email is existing!',
                'success' => false,
                'timestamp' => now()
            ]);
        }

        $hash_password = Hash::make($auth_req['current_password']);

        try {
            DB::beginTransaction();
            $new_user = User::create([
                'email_address' => $auth_req['email_address'],
                'hash_password' => $hash_password
            ]);

            $new_user_id = $new_user->id;

            if (!$new_user_id) {
                return Http::error([
                    'message' => 'Register failed!',
                    'success' => false,
                    'timestamp' => now()
                ]);
            };

            $reset_account_token = ResetUserAccount::create([
                'email_address' => $auth_req['email_address'],
                'reset_token' => $hash_password
            ]);

            $reset_account_token_id = $reset_account_token->id;

            if (!$reset_account_token_id) {
                return Http::error([
                    'message' => 'Create new reset account failed!',
                    'success' => true,
                    'timestamp' => now()
                ]);
            }

            $new_user_info = UserInfo::create([
                'user_id' => $new_user_id,
                'last_name' => $info_req['last_name'],
                'full_name' => $info_req['full_name'],
                'first_name' => $info_req['first_name'],
                'date_of_birth' => $info_req['date_of_birth']
            ]);

            $new_user_info_id = $new_user_info->id;

            if (!$new_user_info_id) return Http::error([
                'message' => 'Create new info is failed!',
                'success' => false,
                'timestamp' => now()
            ]);;

            $new_address_data = [];
            foreach ($address_req['address'] as $key => $value) {
                $new_address_data[$key] = [
                    'user_id' => $new_user_id,
                    'province' => $value['province'],
                    'ward' => $value['ward'],
                    'address_detail' => $value['address_detail'],
                ];
            }
            $new_phone_data = [];
            foreach ($phone_req['phones'] as $key => $value) {
                $new_phone_data[$key] = [
                    'user_id' => $new_user_id,
                    'phone_number' => $value['phone_number']
                ];
            }
            if (!empty($new_address_data)) {
                UserAddress::insert($new_address_data);
            }

            if (!empty($new_phone_data)) {
                UserPhone::insert($new_phone_data);
            }

            DB::commit();

            return Http::success([
                'message' => 'Register successfully!',
                'success' => true,
                'timestamp' => now()
            ]);;
        } catch (Throwable $error) {
            DB::rollBack();
            return Http::success([
                'message' => $error->getMessage(),
                'success' => false,
                'timestamp' => now()
            ]);
        }
    }
    /**
     * Flow: Client → NestJS → Laravel → DB → Laravel → Token Payload → NestJS (JWT → Cookie) → Client
     * Summary of seller_login
     * @param \Illuminate\Http\Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function seller_login(Request $req)
    {
        $req_value = $req->validate([
            'email_address' => 'email|required|max:255',
            'current_password' => 'string|required|min:6|max:255'
        ]);
        try {
            $seller = Seller::where('email_address', '=', $req_value['email_address'])->first();
            if (!$seller) {
                return Http::notfound([
                    'message' => 'Not found user with this email!',
                    'success' => false,
                    'timestamp' => now()
                ]);
            }
            $hash_password = $seller->hash_password;
            $current_password = $req_value['current_password'];
            $password_compare = Hash::check($current_password, $hash_password);
            if (!$password_compare) return Http::warning(['message' => 'Password is not compare!', 'success' => false, 'timestamp' => now()]);

            $payload = [
                'sub' => $seller->id,
                'email_address' => $seller->email_address,
                'role' => 'seller',
                'exp' => '1d'
            ];

            return Http::success(['message' => 'Login successfully!', 'success' => true, 'data' => $payload, 'timestamp' => now()]);
        } catch (Throwable $error) {
            return Http::server_error(['message' => $error->getMessage(), 'success' => false, 'timestamp' => now()]);
        }
    }
    /**
     * Summary of user_login
     * @param \Illuminate\Http\Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function user_login(Request $req)
    {
        $req_value = $req->validate([
            'email_address' => 'email|required|max:255',
            'current_password' => 'string|required|min:6|max:255'
        ]);

        try {
            $user = User::where('email_address', '=', $req_value['email_address'])->first();

            if (!$user) {
                return Http::notfound([
                    'message' => 'Not found user with this email!',
                    'success' => false,
                    'timestamp' => now()
                ]);
            }

            $hash_password = $user->hash_password;
            $current_password = $req_value['current_password'];

            $password_compare = Hash::check($current_password, $hash_password);

            if (!$password_compare)    return Http::warning([
                'message' => 'Password is not compare!',
                'success' => false,
                'timestamp' => now()
            ]);;

            $payload = [
                'sub' => $user->id,
                'email_address' => $user->email_address,
                'role' => 'user',
                'exp' => '1d'
            ];

            return Http::success([
                'message' => 'Login successfully!',
                'success' => true,
                'data' => $payload,
                'timestamp' => now()
            ]);;
        } catch (Throwable $error) {
            return Http::server_error([
                'message' => $error->getMessage(),
                'success' => false,
                'timestamp' => now()
            ]);
        }
    }
    /**
     * Summary of user_profile
     * @param string $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function user_profile()
    {
        $user_id = app(JwtService::class)->auth('user')->id();

        try {
            $profile  = UserInfo::where('user_id', '=', $user_id)->select([
                'id',
                'last_name',
                'full_name',
                'first_name',
                'avatar'
            ])->first();

            if (!$profile) {
                return Http::notfound(['message' => 'This user is not found!']);
            }
            return Http::success(['message' => 'Profile is ready response!', 'success' => true, 'timestamp' => now()]);
        } catch (Throwable $error) {
            return Http::server_error(['message' => $error->getMessage(), 'success' => false, 'timestamp' => now()]);
        }
    }
    /**
     * Summary of seller_profile
     * @param string $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function seller_profile()
    {
        $seller_id = app(JwtService::class)->auth('seller')->id();
        try {
            $profile  = SellerInfo::where('seller_id', '=', $seller_id)->select([
                'id',
                'last_name',
                'full_name',
                'first_name',
                'avatar'
            ])->first();

            if (!$profile) {
                return Http::notfound(['message' => 'This user is not found!']);
            }

            return Http::success(['message' => 'Profile is ready response!', 'success' => true, 'timestamp' => now()]);
        } catch (Throwable $error) {
            return Http::server_error(['message' => $error->getMessage(), 'success' => false, 'timestamp' => now()]);
        }
    }
}
