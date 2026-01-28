import { authService, LoginData, loginService } from "@/api/auth.api";
import { IAuthenticationResponse } from "@/interfaces/common/auth.interface";
import { Role } from "@/interfaces/common/role.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk<
  boolean,
  LoginData,
  { rejectValue: string }
>("login", async ({ currentPassword, emailAddress, loginRole }, thunkAPI) => {
  try {
    const result = await loginService({
      currentPassword,
      emailAddress,
      loginRole,
    });
    return result.success;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string);
  }
});

export const authThunk = createAsyncThunk<
  IAuthenticationResponse,
  { role: Role },
  { rejectValue: string }
>("auth", async ({ role }, thunkAPI) => {
  try {
    const result = await authService(role);
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string);
  }
});
