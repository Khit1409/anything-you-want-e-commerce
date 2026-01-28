/**
 * Request from client Nextjs
 */
export interface LoginDto {
  emailAddress: string;
  currentPassword: string;
  loginRole: 'user' | 'seller';
}
/**
 * Response form laravel
 */
export interface LoginApiResponseDto {
  success: boolean;
  message: string;
  data: {
    sub: string;
    email_address: string;
    role: string;
    exp: '1d' | '1h' | number;
  };
  timestamp: string | Date;
}
/**
 * Response from nestjs
 */
export interface LoginResponseDto {
  success: boolean;
  message: string;
  status: number;
  timestamp: Date;
  cookieValue?: {
    token: string;
    tokenName: string;
  };
}
/**
 * Decoded authentication user
 */
export interface AuthenticationDataDto {
  email: string;
  uid: string;
  role: 'user' | 'admin';
}
/**
 * response to client
 */
export interface AuthenticationResponseDto {
  message: string;
  success: boolean;
  data?: AuthenticationDataDto;
  status: number;
  timestamp: string | Date;
}
/**
 * response of laravel
 */
export interface ProfileDto {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  date_of_birth: Date;
  avatar: string;
}
/**
 * response form laravel
 */
export interface ProfileApiResponseDto {
  data: ProfileDto;
  message: string;
  success: boolean;
}
/**
 * response to client
 */
export interface GetProfileResponseDto {
  data?: ProfileDto;
  message: string;
  success: boolean;
  status: number;
}
/**
 * error of login
 */
export interface LoginErrorResponseDto {
  response: {
    data: { message: string; timestamp: Date | string; success: boolean };
    status: number;
  };
}
